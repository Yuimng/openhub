const service = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const result = await service.create(momentId, content, id);
    ctx.body = result;
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const result = await service.reply(momentId, content, commentId, id);
    ctx.body = result;
  }

  async update(ctx, next) {
    const { commentId, content } = ctx.request.body;
    const result = await service.update(commentId, content);
    ctx.body = result;
  }
}

module.exports = new CommentController();
