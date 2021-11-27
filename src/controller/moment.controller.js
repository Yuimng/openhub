const fs = require('fs');

const fileService = require("../service/file.service");
const momentService = require("../service/moment.service");
const { PICTURE_PATH } = require("../constants/file-path");

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

  async list(ctx, next) {
    // 1.获取数据(offset, size)
    const { offset, size } = ctx.query;

    // 2.查询列表
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
  }

  async update(ctx, next) {
    // 解构
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    // 更新动态内容
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }

  async addLabels(ctx, next) {
    // 1.获取标签和动态id
    const { labels } = ctx;
    const { momentId } = ctx.params;

    // 2.添加所有的标签
    for (let label of labels) {
      const isExist = await momentService.hasLabel(momentId, label.id);
      if (!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }

    ctx.body = "添加标签成功~";
  }

  async fileInfo(ctx, next) {
    const { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController();
