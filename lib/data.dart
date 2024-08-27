import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'api/common.dart';
import 'api/get_comments.dart';
import 'api/get_discussions.dart';
import 'api/get_pinned_discussions.dart';
import 'api/get_repositories_count.dart';
import 'api/search.dart';

final isDesktop = !kIsWeb && GetPlatform.isDesktop;

const owner = 'share121';
const repo = 'inter-knot';
const clientId = 'Iv23li8gf1MxGAgvw5lU';
const clientSecret = '3ea999c0e2d7283f602ab4994cc684ada2eeec2b';
const collaborators = ['VacuolePaoo'];
const githubLink = 'https://github.com/$owner/$repo';
const discordLink = 'https://disboard.org/zh-cn/server/1273078781241987134';
const docLink = 'https://docs.xn--5o0anh.top/';

class Controller extends GetxController {
  late final SharedPreferencesWithCache pref;

  final searchQuery = ''.obs;
  final searchResult = <Article>[].obs;
  String? searchEndCur;
  final searchHasNextPage = true.obs;

  String getToken() => pref.getString('access_token') ?? '';
  Future<void> setToken(String v) => pref.setString('access_token', v);
  String getRefreshToken() => pref.getString('refresh_token') ?? '';
  Future<void> setRefreshToken(String v) => pref.setString('refresh_token', v);

  @override
  Future<void> onInit() async {
    super.onInit();
    ever(data, (_) {
      final t = removeDuplicateArticle(data);
      if (t.length < data.length) data.value = t;
    });
    ever(searchResult, (_) {
      final t = removeDuplicateArticle(searchResult);
      if (t.length < searchResult.length) searchResult.value = t;
    });
    debounce(searchQuery, (query) {
      searchResult.clear();
      searchEndCur = null;
      searchHasNextPage.value = true;
      searchCache.clear();
      searchData();
    }, time: 500.ms);
    pref = await SharedPreferencesWithCache.create(
      cacheOptions: const SharedPreferencesWithCacheOptions(),
    );
    await fetchData();
    searchResult.addAll(data);
  }

  final selectedIndex = 0.obs;
  final pageController = PageController();

  Future<void> animateToPage(int index) {
    selectedIndex.value = index;
    return pageController.animateToPage(
      index,
      duration: 0.5.s,
      curve: Curves.ease,
    );
  }

  final data = <Article>[].obs;
  String? endCur;
  final hasNextPage = true.obs;
  var isFetchPinDiscussions = true;

  final cache = <String?>[];
  Future<void> fetchData() async {
    if (this.hasNextPage.isFalse || cache.contains(endCur)) return;
    cache.add(endCur);
    late final Nodes<Article> res;
    if (isFetchPinDiscussions) {
      res = await getPinnedDiscussions(endCur);
    } else {
      res = await getDiscussions(endCur);
    }
    final (:endCursor, :hasNextPage, res: articles) = res;
    endCur = endCursor;
    if (isFetchPinDiscussions && !hasNextPage) {
      isFetchPinDiscussions = false;
      endCur = null;
      cache.clear();
    } else {
      this.hasNextPage.value = hasNextPage;
    }
    data.addAll(res.res);
  }

  Future<void> refreshData() async {
    isFetchPinDiscussions = true;
    hasNextPage.value = true;
    endCur = null;
    cache.clear();
    data.clear();
    await fetchData();
  }

  Future<void> refreshSearchData() async {
    searchHasNextPage.value = true;
    searchEndCur = null;
    searchCache.clear();
    searchResult.clear();
    await searchData();
  }

  final searchCache = <String?>[];
  Future<void> searchData() async {
    if (searchQuery.isEmpty) {
      await fetchData();
      searchResult.clear();
      searchResult.addAll(data);
      return;
    }
    if (searchHasNextPage.isFalse || searchCache.contains(searchEndCur)) return;
    searchCache.add(searchEndCur);
    final (:endCursor, :hasNextPage, :res) =
        await search(searchQuery(), searchEndCur);
    searchEndCur = endCursor;
    searchHasNextPage.value = hasNextPage;
    searchResult.addAll(res);
  }
}

class Article extends GetxController {
  final String title;
  final String bodyHTML;
  final String bodyText;
  final Author author;
  final String? cover;
  final int number;
  final String url;
  final String id;
  final DateTime createdAt;
  final DateTime? lastEditedAt;
  final int commentsCount;
  final comments = <Comment>[].obs;
  var hasNextPage = true.obs;
  String? endCursor;
  final bool isPin;
  final String partition;

  final cache = <String?>[];
  Future<void> fetchComments() async {
    if (hasNextPage.isFalse || cache.contains(endCursor)) {
      return;
    }
    final (:res, hasNextPage: newHasNextPage, endCursor: newEndCursor) =
        await getComments(number, endCursor);
    comments.addAll(res);
    comments.value = removeDuplicateComment(comments);
    hasNextPage.value = newHasNextPage;
    endCursor = newEndCursor;
  }

  Article({
    required this.title,
    required this.bodyHTML,
    required this.bodyText,
    required this.author,
    this.cover,
    required this.number,
    required this.id,
    required this.createdAt,
    required this.commentsCount,
    this.lastEditedAt,
    required this.isPin,
    required this.partition,
  }) : url = 'https://github.com/$owner/$repo/discussions/$number';
}

class Comment extends GetxController {
  final Author author;
  final String bodyHTML;
  final DateTime createdAt;
  final DateTime? lastEditedAt;
  final replies = <Reply>[].obs;
  final String id;

  Comment({
    required this.author,
    required this.bodyHTML,
    required this.createdAt,
    this.lastEditedAt,
    required Iterable<Reply> replies,
    required this.id,
  }) {
    this.replies.addAll(replies);
  }
}

class Reply {
  final Author author;
  final String bodyHTML;
  final DateTime createdAt;
  final DateTime? lastEditedAt;

  Reply({
    required this.author,
    required this.bodyHTML,
    required this.createdAt,
    this.lastEditedAt,
  });
}

extension Use<V> on V? {
  T? use<T>(T Function(V value) fn) => this == null ? null : fn(this as V);
}

extension True on bool {
  T? isTrue<T>(T Function() fn) => this ? fn() : null;
  T? isFalse<T>(T Function() fn) => !this ? fn() : null;
}

extension Num2Duration on num {
  Duration get microseconds => Duration(microseconds: toInt());
  Duration get ms => (this * 1000).microseconds;
  Duration get s => (this * 1000).ms;
  Duration get min => (this * 60).s;
  Duration get hour => (this * 60).min;
  Duration get day => (this * 24).hour;
  Duration get week => (this * 7).day;
}

extension DurationFomater on Duration {
  /// MM:SS
  String get format =>
      '${inMinutes.toString().padLeft(2, '0')}:${inSeconds.remainder(60).toString().padLeft(2, '0')}';
}

class Author {
  final String name;
  final String avatar;
  final String url;
  final level = 0.obs;

  Author({required this.name, required this.avatar, int? level})
      : url = 'https://github.com/$name' {
    if (level == null) {
      getRepositoriesCount(name).then((v) {
        if (v == null) return;
        this.level.value = v;
      });
    } else {
      this.level.value = level;
    }
  }
}

List<Article> removeDuplicateArticle(List<Article> arr) {
  final res = <Article>[];
  for (final item in arr) {
    final isDuplicate = res.any((e) => item.id == e.id);
    if (!isDuplicate) res.add(item);
  }
  return res;
}

List<Comment> removeDuplicateComment(List<Comment> arr) {
  final res = <Comment>[];
  for (final item in arr) {
    final isDuplicate = res.any((e) => item.id == e.id);
    if (!isDuplicate) res.add(item);
  }
  return res;
}