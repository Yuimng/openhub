const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 1. 获取数据(user_id, content )
    // 授权成功时 ctx.user 包含 id
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 2.将数据插入到数据库
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }

  async detail(ctx, next) {
    // 1.获取数据(momentId)
    const momentId = ctx.params.momentId;
    // 2.根据id去查询数据
    const result = await momentService.getMomentById(momentId);

    ctx.body = result;
  }
}

module.exports = new MomentController();
