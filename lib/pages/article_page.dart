import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
import 'package:get/get.dart';
import 'package:inter_knot/widget/avatar.dart';
import 'package:url_launcher/url_launcher_string.dart';
import 'package:window_manager/window_manager.dart';

import '../widget/comment_count.dart';
import '../gen/assets.gen.dart';
import '../data.dart';
import '../widget/window_buttons.dart';

class ArticlePage extends StatefulWidget {
  const ArticlePage({super.key, required this.article, required this.heroKey});

  final Article article;
  final UniqueKey heroKey;

  @override
  State<ArticlePage> createState() => _ArticlePageState();
}

class _ArticlePageState extends State<ArticlePage> {
  final scrollController = ScrollController();
  final c = Get.find<Controller>();

  @override
  void initState() {
    super.initState();
    scrollController.addListener(() {
      final maxScroll = scrollController.position.maxScrollExtent;
      final currentScroll = scrollController.position.pixels;
      if (maxScroll - currentScroll < 200 && widget.article.hasNextPage()) {
        widget.article.fetchComments();
      }
    });
    widget.article.fetchComments().then((e) async {
      while (scrollController.position.maxScrollExtent == 0 &&
          widget.article.hasNextPage()) {
        await widget.article.fetchComments();
      }
    });
  }

  @override
  void dispose() {
    scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: DragToMoveArea(child: Text(widget.article.title)),
        flexibleSpace: const DragToMoveArea(child: SizedBox.expand()),
        actions: [
          IconButton(
            icon: const Icon(Icons.open_in_new),
            tooltip: 'Open in Browser'.tr,
            onPressed: () => launchUrlString(widget.article.url),
          ),
          const SizedBox(width: 8),
          if (isDesktop) const WindowButtons(),
        ],
        elevation: 4,
      ),
      body: LayoutBuilder(builder: (context, con) {
        if (con.maxWidth < 800) {
          return SingleChildScrollView(
            controller: scrollController,
            child: Column(
              children: [
                Container(
                  constraints: const BoxConstraints(maxHeight: 600),
                  width: double.infinity,
                  child:
                      Cover(heroKey: widget.heroKey, article: widget.article),
                ),
                RightBox(article: widget.article),
              ],
            ),
          );
        }
        return SizedBox.expand(
          child: Row(
            children: [
              Expanded(
                flex: 4,
                child: Cover(heroKey: widget.heroKey, article: widget.article),
              ),
              Expanded(
                flex: 5,
                child: SizedBox.expand(
                  child: SingleChildScrollView(
                    controller: scrollController,
                    child: RightBox(article: widget.article),
                  ),
                ),
              )
            ],
          ),
        );
      }),
      floatingActionButton: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          FloatingActionButton(
            tooltip: 'Back to Top'.tr,
            onPressed: () => scrollController.animateTo(
              0,
              duration: const Duration(milliseconds: 500),
              curve: Curves.easeInOut,
            ),
            child: const Icon(Icons.arrow_upward),
          ),
          const SizedBox(height: 16),
          FloatingActionButton(
            onPressed: () =>
                launchUrlString('${widget.article.url}#new_comment_form'),
            tooltip: 'Write a review'.tr,
            child: const Icon(Icons.add_comment),
          ),
        ],
      ),
    );
  }
}

class RightBox extends StatelessWidget {
  const RightBox({super.key, required this.article});

  final Article article;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: 16,
        vertical: 32,
      ),
      child: Column(
        children: [
          MainArticle(article: article),
          const SizedBox(height: 16),
          const Divider(),
          Comments(article: article),
        ],
      ),
    );
  }
}

class MainArticle extends StatelessWidget {
  const MainArticle({super.key, required this.article});

  final Article article;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Text(
                article.title,
                style: Theme.of(context).textTheme.headlineLarge,
              ),
            ),
            const SizedBox(width: 8),
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: CommentCount(article: article),
            ),
          ],
        ),
        const SizedBox(height: 8),
        ListTile(
          onTap: () => launchUrlString(article.author.url),
          leading: Avatar(article.author.avatar),
          title: Text(
            article.author.name,
            style: Theme.of(context).textTheme.titleMedium,
          ),
          subtitle: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Wrap(
              spacing: 8,
              children: [
                Obx(() => MyChip('Lv${article.author.level()}')),
                if (article.author.name == owner)
                  MyChip('Founder of Inter-Knot'.tr),
                if (collaborators.contains(article.author.name))
                  MyChip('Inter-Knot collaborator'.tr),
              ],
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text('Published on: '.tr + article.createdAt.toLocal().toString()),
        if (article.lastEditedAt != null)
          Text('Last edited on: '.tr +
              article.lastEditedAt!.toLocal().toString()),
        const SizedBox(height: 16),
        SelectionArea(
          child: HtmlWidget(
            article.bodyHTML,
            textStyle: const TextStyle(fontSize: 16),
          ),
        ),
      ],
    );
  }
}

class Comments extends StatelessWidget {
  const Comments({super.key, required this.article});

  final Article article;

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      return Column(
        children: [
          for (final (index, comment) in article.comments.indexed)
            ListTile(
              titleAlignment: ListTileTitleAlignment.top,
              leading: ClipOval(
                child: InkWell(
                  borderRadius: BorderRadius.circular(50),
                  onTap: () => launchUrlString(comment.author.url),
                  child: Avatar(comment.author.avatar),
                ),
              ),
              title: Row(
                children: [
                  Flexible(child: Text(comment.author.name)),
                  const SizedBox(width: 8),
                  Expanded(
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Wrap(
                        spacing: 8,
                        children: [
                          Obx(() => MyChip('Lv${comment.author.level()}')),
                          if (comment.author.name == article.author.name)
                            MyChip('landlord'.tr),
                          if (comment.author.name == owner)
                            MyChip('Founder of Inter-Knot'.tr),
                          if (collaborators.contains(comment.author.name))
                            MyChip('Inter-Knot collaborator'.tr),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
              trailing: MyChip('F${index + 1}'),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Published on: '.tr +
                      comment.createdAt.toLocal().toString()),
                  if (comment.lastEditedAt != null)
                    Text('Last edited on: '.tr +
                        comment.lastEditedAt!.toLocal().toString()),
                  const SizedBox(height: 8),
                  SelectionArea(
                    child: HtmlWidget(
                      comment.bodyHTML,
                      textStyle: const TextStyle(fontSize: 16),
                    ),
                  ),
                  const Divider(),
                  Replies(comment: comment, article: article),
                ],
              ),
            ),
          Obx(() {
            if (article.hasNextPage.isTrue) {
              return const Padding(
                padding: EdgeInsets.all(16),
                child: Center(child: CircularProgressIndicator()),
              );
            } else {
              return Text('No more comments'.tr);
            }
          })
        ],
      );
    });
  }
}

class Replies extends StatelessWidget {
  const Replies({super.key, required this.comment, required this.article});

  final Comment comment;
  final Article article;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        for (final (index, reply) in comment.replies.indexed)
          ListTile(
            titleAlignment: ListTileTitleAlignment.top,
            leading: ClipOval(
              child: InkWell(
                borderRadius: BorderRadius.circular(50),
                onTap: () => launchUrlString(reply.author.url),
                child: Avatar(reply.author.avatar),
              ),
            ),
            title: Row(
              children: [
                Flexible(child: Text(reply.author.name)),
                const SizedBox(width: 8),
                Expanded(
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Wrap(
                      spacing: 8,
                      children: [
                        Obx(() => MyChip('Lv${reply.author.level()}')),
                        if (reply.author.name == article.author.name)
                          MyChip('landlord'.tr),
                        if (reply.author.name == comment.author.name)
                          MyChip('layer master'.tr),
                        if (reply.author.name == owner)
                          MyChip('Founder of Inter-Knot'.tr),
                        if (collaborators.contains(reply.author.name))
                          MyChip('Inter-Knot collaborator'.tr),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            trailing: MyChip('F${index + 1}'),
            subtitle: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                    'Published on: '.tr + reply.createdAt.toLocal().toString()),
                if (reply.lastEditedAt != null)
                  Text('Last edited on: '.tr +
                      reply.lastEditedAt!.toLocal().toString()),
                const SizedBox(height: 8),
                SelectionArea(
                  child: HtmlWidget(
                    reply.bodyHTML,
                    textStyle: const TextStyle(fontSize: 16),
                  ),
                ),
                const Divider(),
              ],
            ),
          ),
      ],
    );
  }
}

class MyChip extends StatelessWidget {
  const MyChip(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Chip(
      label: Text(text),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(50),
      ),
      padding: const EdgeInsets.all(0),
      labelStyle: Theme.of(context).textTheme.labelSmall,
    );
  }
}

class Cover extends StatelessWidget {
  const Cover({super.key, required this.article, required this.heroKey});

  final Article article;
  final UniqueKey heroKey;

  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: heroKey,
      child: article.cover == null
          ? Assets.images.defaultCover.image()
          : MouseRegion(
              cursor: SystemMouseCursors.click,
              child: GestureDetector(
                onTap: () => launchUrlString(article.cover!),
                child: CachedNetworkImage(
                  imageUrl: article.cover!,
                  fit: BoxFit.contain,
                  progressIndicatorBuilder: (context, url, downloadProgress) {
                    return Center(
                      child: CircularProgressIndicator(
                        value: downloadProgress.progress,
                      ),
                    );
                  },
                  errorWidget: (context, url, error) =>
                      Assets.images.defaultCover.image(),
                ),
              ),
            ),
    );
  }
}