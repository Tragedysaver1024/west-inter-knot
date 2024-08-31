part of 'api_user.dart';

Future<Author?> getSelfUserInfo() async {
  final res = await graphql(
      '{ viewer { avatarUrl login name repositories { totalCount } } }');
  if (res.data
      case {
        'data': {
          'viewer': {
            'repositories': {
              'totalCount': final int totalCount,
            },
            'name': final String name,
            'login': final String login,
            'avatarUrl': final String avatar,
          }
        }
      }) {
    return Author(login: login, avatar: avatar, name: name, level: totalCount);
  }
  return null;
}
