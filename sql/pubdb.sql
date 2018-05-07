/*
Navicat MySQL Data Transfer

Source Server         : remotemysql
Source Server Version : 50639
Source Host           : 47.96.17.11:6002
Source Database       : pubdb

Target Server Type    : MYSQL
Target Server Version : 50639
File Encoding         : 65001

Date: 2018-05-07 09:09:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `pub_backlog`
-- ----------------------------
DROP TABLE IF EXISTS `pub_backlog`;
CREATE TABLE `pub_backlog` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `sort` int(20) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL COMMENT '标题',
  `content` varchar(500) DEFAULT NULL,
  `html_dir` varchar(200) DEFAULT NULL COMMENT 'html路径',
  `stat` int(1) DEFAULT NULL COMMENT '状态:0编辑2发布3结束',
  `submit_time` datetime DEFAULT NULL COMMENT '发布时间',
  `create_user` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `deleted` char(1) DEFAULT 'N',
  `deleted_user` varchar(20) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `update_user` varchar(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pub_backlog
-- ----------------------------
INSERT INTO `pub_backlog` VALUES ('1', null, '待办事项', null, null, null, null, null, '2018-02-11 14:15:02', 'Y', null, '2018-02-11 14:15:33', null, null);
INSERT INTO `pub_backlog` VALUES ('2', null, '待办事项', null, null, null, null, null, '2018-02-11 14:15:40', 'Y', null, '2018-02-11 14:18:06', null, '2018-02-11 14:18:02');
INSERT INTO `pub_backlog` VALUES ('3', null, '待办', null, 'backlog\\201802\\57924637-9ad4-4bf0-9a45-3abd164020c5.html', '2', '2018-02-23 08:52:36', null, '2018-02-11 14:18:13', 'N', null, null, null, '2018-02-26 15:30:24');
INSERT INTO `pub_backlog` VALUES ('4', null, '待办事项1', null, 'backlog\\201802\\46a592e5-5c31-4b06-b43f-1de2db9989d0.html', '2', '2018-02-12 11:10:31', null, '2018-02-12 11:06:50', 'N', null, null, null, '2018-02-26 15:30:13');
INSERT INTO `pub_backlog` VALUES ('5', null, '阿斯顿', null, 'backlog\\201802\\02192c17-b22d-418a-9dcd-6e663d11b8b7.html', '2', '2018-02-26 15:41:40', null, '2018-02-26 12:12:36', 'N', null, null, null, '2018-02-26 15:41:40');

-- ----------------------------
-- Table structure for `pub_comp`
-- ----------------------------
DROP TABLE IF EXISTS `pub_comp`;
CREATE TABLE `pub_comp` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `sort` int(20) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL COMMENT '名称',
  `short_name` varchar(200) DEFAULT NULL COMMENT '简称',
  `address` varchar(300) DEFAULT NULL COMMENT '地址',
  `link_man` varchar(20) DEFAULT NULL COMMENT '联系人',
  `link_phone` varchar(100) DEFAULT NULL COMMENT '联系电话',
  `create_user` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `deleted` char(1) DEFAULT 'N',
  `deleted_user` varchar(20) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `update_user` varchar(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pub_comp
-- ----------------------------
INSERT INTO `pub_comp` VALUES ('1', null, '传欣信息1', '传欣信息1', '传欣信息1', '王一杰', '111111111', null, '2018-02-11 09:24:59', 'Y', null, '2018-02-11 09:32:52', null, '2018-02-11 09:31:27');
INSERT INTO `pub_comp` VALUES ('2', '1', '宁波钢铁', '宁波钢铁', '宁波钢铁', '宁波钢铁', '111122222', null, '2018-02-11 09:31:48', 'N', null, null, null, '2018-02-26 14:35:17');
INSERT INTO `pub_comp` VALUES ('3', null, '宁波传欣', '宁波传欣', '', '', '', null, '2018-02-11 16:03:59', 'Y', null, '2018-02-11 16:04:08', null, null);
INSERT INTO `pub_comp` VALUES ('4', '2', '宁波传欣', '宁波传欣', '', '', '', null, '2018-02-11 16:04:00', 'N', null, null, null, '2018-02-26 14:35:24');
INSERT INTO `pub_comp` VALUES ('5', '4', '奥克斯', '奥克斯', '', '', '', null, '2018-02-11 16:04:51', 'N', null, null, null, '2018-02-26 14:35:40');
INSERT INTO `pub_comp` VALUES ('6', '3', '美的', '美的', '', '', '', null, '2018-02-11 16:05:00', 'N', null, null, null, '2018-02-26 14:35:35');
INSERT INTO `pub_comp` VALUES ('7', '5', '宁波报业', '宁波报业', '宁波报业', '宁波报业', '111111', null, '2018-02-26 17:04:07', 'N', null, null, null, '2018-02-26 17:04:18');
INSERT INTO `pub_comp` VALUES ('8', '0', '谢谢', '谢谢', '', '', '', null, '2018-02-26 17:11:29', 'Y', null, '2018-02-26 17:11:31', null, null);

-- ----------------------------
-- Table structure for `pub_comp_to_backlog`
-- ----------------------------
DROP TABLE IF EXISTS `pub_comp_to_backlog`;
CREATE TABLE `pub_comp_to_backlog` (
  `backlog_id` int(20) NOT NULL COMMENT '待办id',
  `comp_id` int(20) NOT NULL COMMENT '公司id',
  PRIMARY KEY (`backlog_id`,`comp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pub_comp_to_backlog
-- ----------------------------
INSERT INTO `pub_comp_to_backlog` VALUES ('3', '2');
INSERT INTO `pub_comp_to_backlog` VALUES ('3', '4');
INSERT INTO `pub_comp_to_backlog` VALUES ('4', '5');
INSERT INTO `pub_comp_to_backlog` VALUES ('4', '6');
INSERT INTO `pub_comp_to_backlog` VALUES ('5', '2');
INSERT INTO `pub_comp_to_backlog` VALUES ('5', '4');

-- ----------------------------
-- Table structure for `pub_infodevy`
-- ----------------------------
DROP TABLE IF EXISTS `pub_infodevy`;
CREATE TABLE `pub_infodevy` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `sort` int(20) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL COMMENT '标题',
  `type` char(2) DEFAULT NULL COMMENT '类型00新闻01重要文件02通知公告03简报专报04工作动态05先进经验',
  `html_dir` varchar(200) DEFAULT NULL COMMENT 'html路径',
  `main_pic_dir` varchar(200) DEFAULT NULL COMMENT '主图路径',
  `stat` int(1) DEFAULT NULL COMMENT '状态：1待审核2审核通过3审核不通过',
  `link_man` varchar(20) DEFAULT NULL COMMENT '联系人',
  `link_phone` varchar(100) DEFAULT NULL COMMENT '联系电话',
  `create_org` varchar(200) DEFAULT NULL COMMENT '创建单位',
  `create_user` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `deleted` char(1) DEFAULT 'N',
  `deleted_user` varchar(20) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `update_user` varchar(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pub_infodevy
-- ----------------------------
INSERT INTO `pub_infodevy` VALUES ('1', null, '我的新闻', '00', '00\\201802\\c358e4b7-d50c-49fd-8b25-7607a9b87848.html', '00_pic\\201802\\7e79cb16-8154-4db0-8b0e-ef125ae491ce.png', '2', '慈溪', '110', '慈溪', null, '2018-02-13 11:50:16', 'N', null, null, null, '2018-02-13 15:32:23');
INSERT INTO `pub_infodevy` VALUES ('2', null, '我是一条重要文件', '01', '01\\201802\\8e5d4cc6-b8c0-4959-ab55-a1b091141bed.html', '', '1', '', '', '余姚', null, '2018-02-13 15:54:30', 'Y', null, '2018-02-13 16:04:21', null, null);
INSERT INTO `pub_infodevy` VALUES ('3', null, '新闻新闻哦', '00', '00\\201802\\3e3d0739-b775-4372-ba28-a3cfcbd69839.html', '00_pic\\201802\\4fe7d277-2f3a-44c5-b83a-38c8e4c77146.png', '2', '', '', '奉化', null, '2018-02-13 16:22:39', 'N', null, null, null, '2018-02-13 16:24:20');
INSERT INTO `pub_infodevy` VALUES ('4', null, '通知公告', '02', '02\\201802\\6afc2d40-8983-4bdf-ab5e-dc9961f9a592.html', '', '2', '', '', '北仑', null, '2018-02-13 16:23:17', 'N', null, null, null, '2018-02-13 16:24:17');
INSERT INTO `pub_infodevy` VALUES ('5', null, '哈哈哈', '03', '03\\201802\\fdc37477-7adc-40c6-bc5b-f7ae215a4deb.html', '', '2', '', '', '江北', null, '2018-02-13 17:05:17', 'N', null, null, null, '2018-02-26 12:37:43');
INSERT INTO `pub_infodevy` VALUES ('6', null, '滚滚滚', '03', '03\\201802\\ac99721e-ab58-4ca5-861d-122bf3f7807e.html', '', '1', '', '', '江北', null, '2018-02-13 17:07:38', 'N', null, null, null, null);
INSERT INTO `pub_infodevy` VALUES ('7', null, 'ceshi', '01', '01\\201802\\6c12d2b4-158a-4612-9512-615f541c18f9.html', '', '2', 'fff', '110', 'fff', null, '2018-02-21 22:03:02', 'N', null, null, null, '2018-02-26 12:38:07');
INSERT INTO `pub_infodevy` VALUES ('8', null, 'ggg', '02', '02\\201802\\33061936-4ae3-4579-a516-eb45c979e6ba.html', '', '2', 'hhh', '000', 'hhh', null, '2018-02-22 01:16:49', 'N', null, null, null, '2018-02-23 09:02:30');
INSERT INTO `pub_infodevy` VALUES ('9', null, '测', '00', '00\\201802\\f0ffb24a-201e-48da-9858-bd45116d2255.html', '00_pic\\201802\\0230a718-10ee-40b6-b6c7-a7f917ad050c.jpg', '2', '12412', '24242', '测试单位', null, '2018-02-23 09:36:49', 'N', null, null, null, '2018-02-23 09:37:12');
INSERT INTO `pub_infodevy` VALUES ('10', null, '测试报送', '01', '', '', '2', '王一杰', '110', '2', null, '2018-02-26 16:20:59', 'N', null, null, null, '2018-02-26 16:55:30');
INSERT INTO `pub_infodevy` VALUES ('11', null, '哈哈哈', '00', '00\\201802\\a81bd5cc-dca0-4fef-a329-ab61ecb87f27.html', '00_pic\\201802\\fd1750f8-6732-4802-8aa2-8b9bf7b917d1.png', '2', '哈哈哈', '111', '6', null, '2018-02-26 17:12:10', 'N', null, null, null, '2018-02-26 17:12:25');
INSERT INTO `pub_infodevy` VALUES ('12', null, '测试ie8', '01', '01\\201803\\ffde7108-178c-46a2-a846-e204735dc7ce.html', '01_pic\\201803\\5952a0c2-40a8-451e-a6ab-8f4e6c4b5723.png', '2', '下单', '2312', '2', null, '2018-03-12 15:55:06', 'N', null, null, null, '2018-03-12 15:55:43');

-- ----------------------------
-- Table structure for `pub_infodevyorg`
-- ----------------------------
DROP TABLE IF EXISTS `pub_infodevyorg`;
CREATE TABLE `pub_infodevyorg` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `parent_id` int(20) DEFAULT NULL,
  `sort` int(20) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL COMMENT '机构名称',
  `address` varchar(300) DEFAULT NULL COMMENT '地址',
  `link_man` varchar(20) DEFAULT NULL COMMENT '联系人',
  `link_phone` varchar(100) DEFAULT NULL COMMENT '联系电话',
  `devysum` int(20) DEFAULT NULL,
  `create_user` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `deleted` char(1) DEFAULT 'N',
  `deleted_user` varchar(20) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `update_user` varchar(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pub_infodevyorg
-- ----------------------------
INSERT INTO `pub_infodevyorg` VALUES ('1', null, null, '慈溪', '', '', '', '2', null, '2018-02-13 16:55:02', 'Y', null, '2018-02-13 16:55:35', null, '2018-02-13 16:55:12');
INSERT INTO `pub_infodevyorg` VALUES ('2', null, null, '余姚', '', '', '', '0', null, '2018-02-13 16:55:32', 'N', null, null, null, null);
INSERT INTO `pub_infodevyorg` VALUES ('3', null, null, '慈溪', '', '', '', '1', null, '2018-02-13 16:55:44', 'N', null, null, null, '2018-02-24 08:37:00');

-- ----------------------------
-- Table structure for `pub_news`
-- ----------------------------
DROP TABLE IF EXISTS `pub_news`;
CREATE TABLE `pub_news` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `sort` int(20) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL COMMENT '标题',
  `type` char(2) DEFAULT NULL COMMENT '类型00新闻01重要文件02通知公告03简报专报04工作动态05先进经验',
  `html_dir` varchar(200) DEFAULT NULL COMMENT 'html路径',
  `main_pic_dir` varchar(200) DEFAULT NULL COMMENT '主图路径',
  `submit_time` datetime DEFAULT NULL COMMENT '发布时间',
  `stat` int(1) DEFAULT NULL COMMENT '状态：0编辑1待审核2发布3下架',
  `create_org` varchar(200) DEFAULT NULL COMMENT '创建单位',
  `infodevy_id` int(20) DEFAULT NULL,
  `create_user` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `deleted` char(1) DEFAULT 'N',
  `deleted_user` varchar(20) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `update_user` varchar(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pub_news
-- ----------------------------
INSERT INTO `pub_news` VALUES ('1', null, 'HAHAHAH', '00', null, null, null, '0', null, null, null, '2018-02-08 17:00:27', 'Y', null, '2018-02-09 10:50:29', null, null);
INSERT INTO `pub_news` VALUES ('2', null, '新闻标题1', '00', null, null, null, '0', null, null, null, '2018-02-08 17:04:19', 'Y', null, '2018-02-09 11:05:45', null, '2018-02-09 11:05:33');
INSERT INTO `pub_news` VALUES ('5', null, '这是一条新闻', '00', '00\\201802\\f156226c-2ece-4ee2-a25a-d45df2b5d347.html', null, '2018-02-09 11:07:21', '2', null, null, null, '2018-02-09 10:30:08', 'Y', null, '2018-02-09 14:15:28', null, '2018-02-09 13:34:29');
INSERT INTO `pub_news` VALUES ('6', null, '添加新闻标题很长很长很长很长很长很长很长', '00', '00\\201802\\0100e029-a67a-4665-b08c-33784be03753.html', '00_pic\\201802\\96e1290b-9de3-4959-8373-ccda01b66c06.png', null, '2', null, null, null, '2018-02-09 10:59:47', 'N', null, null, null, '2018-02-09 16:59:23');
INSERT INTO `pub_news` VALUES ('7', null, '通知公告1', '02', '02\\201802\\146da2b9-557d-4ce4-9240-34ee7bdfeb8d.html', null, null, '0', null, null, null, '2018-02-09 13:55:17', 'Y', null, '2018-02-09 14:00:53', null, '2018-02-09 13:59:16');
INSERT INTO `pub_news` VALUES ('8', null, '通知公告', '02', '02\\201802\\53798d65-f8c7-4d9d-b94e-62e83c9a0ab3.html', null, '2018-02-09 14:09:08', '2', null, null, null, '2018-02-09 14:01:02', 'N', null, null, null, '2018-02-09 14:09:08');
INSERT INTO `pub_news` VALUES ('9', null, '重要文件', '01', '01\\201802\\d1a0b81e-64ff-44e5-9985-5b0d7c28e8ba.html', null, '2018-02-23 08:51:50', '2', null, null, null, '2018-02-09 14:09:18', 'N', null, null, null, '2018-02-23 08:51:50');
INSERT INTO `pub_news` VALUES ('10', null, '1', '00', null, null, null, '0', null, null, null, '2018-02-09 14:17:03', 'N', null, null, null, null);
INSERT INTO `pub_news` VALUES ('11', null, '2', '00', null, null, null, '0', null, null, null, '2018-02-09 14:17:07', 'N', null, null, null, null);
INSERT INTO `pub_news` VALUES ('12', null, '3', '00', null, null, null, '0', null, null, null, '2018-02-09 14:17:11', 'N', null, null, null, null);
INSERT INTO `pub_news` VALUES ('13', null, '4', '00', null, null, null, '0', null, null, null, '2018-02-09 14:17:14', 'N', null, null, null, null);
INSERT INTO `pub_news` VALUES ('14', null, '5', '00', null, null, null, '0', null, null, null, '2018-02-09 14:17:17', 'N', null, null, null, null);
INSERT INTO `pub_news` VALUES ('15', null, '6', '00', null, null, null, '0', null, null, null, '2018-02-09 14:17:26', 'N', null, null, null, null);
INSERT INTO `pub_news` VALUES ('16', null, '7', '00', null, '00_pic\\201802\\ae6d3baf-b4ce-4062-ace5-5cb316b740c5.jpg', null, '0', null, null, null, '2018-02-09 14:17:30', 'N', null, null, null, '2018-02-10 20:14:29');
INSERT INTO `pub_news` VALUES ('17', null, '标题8', '00', null, '00_pic\\201802\\74131163-9f7e-4b3a-b7a0-877fae9ec16a.jpg', '2018-02-27 11:51:13', '2', null, null, null, '2018-02-09 14:17:37', 'N', null, null, null, '2018-02-27 11:51:38');
INSERT INTO `pub_news` VALUES ('18', null, '测试标题9', '00', '00\\201802\\2b8c32f7-42eb-4177-baf3-f032124f7c58.html', '00_pic\\201802\\755b5291-68f2-4a30-bc23-e4c02029410b.png', '2018-02-27 11:51:11', '2', null, null, null, '2018-02-09 14:17:40', 'N', null, null, null, '2018-02-27 11:51:27');
INSERT INTO `pub_news` VALUES ('19', null, '10', '00', null, '00_pic\\201802\\22a421ce-c47f-4a57-a8fd-0e8bde62ec30.jpg', null, '0', null, null, null, '2018-02-09 14:17:45', 'Y', null, '2018-02-09 16:59:09', null, '2018-02-09 16:58:15');
INSERT INTO `pub_news` VALUES ('20', null, '简报专报', '03', '03\\201802\\1c61e4fb-a97f-4517-b959-82a9b1b8e63d.html', null, '2018-02-09 17:17:48', '2', null, null, null, '2018-02-09 17:16:44', 'N', null, null, null, '2018-02-09 17:17:48');
INSERT INTO `pub_news` VALUES ('21', null, '工作动态', '04', '04\\201802\\a02015b3-74cb-4452-8077-5ad7569bd531.html', null, '2018-02-09 17:17:44', '2', null, null, null, '2018-02-09 17:17:11', 'N', null, null, null, '2018-02-09 17:17:44');
INSERT INTO `pub_news` VALUES ('22', null, '先进经验', '05', '05\\201802\\8c438224-eb5e-4299-b970-13370de9fe33.html', null, '2018-02-09 17:17:40', '2', null, null, null, '2018-02-09 17:17:28', 'N', null, null, null, '2018-02-09 17:17:40');
INSERT INTO `pub_news` VALUES ('24', null, '我的新闻', '00', '00\\201802\\c358e4b7-d50c-49fd-8b25-7607a9b87848.html', '00_pic\\201802\\7e79cb16-8154-4db0-8b0e-ef125ae491ce.png', null, '0', '慈溪', '1', null, '2018-02-13 11:50:16', 'Y', null, '2018-02-13 15:32:13', null, null);
INSERT INTO `pub_news` VALUES ('25', null, '我的新闻', '00', '00\\201802\\c358e4b7-d50c-49fd-8b25-7607a9b87848.html', '00_pic\\201802\\5dd81496-9b10-44a3-919b-820d88171545.png', null, '2', '慈溪', '1', null, '2018-02-13 11:50:16', 'N', null, null, null, '2018-02-23 10:03:18');
INSERT INTO `pub_news` VALUES ('26', null, '通知公告', '02', '02\\201802\\6afc2d40-8983-4bdf-ab5e-dc9961f9a592.html', '', '2018-02-13 16:25:11', '2', '北仑', '4', null, '2018-02-13 16:23:17', 'Y', null, '2018-02-13 16:25:25', null, '2018-02-13 16:25:11');
INSERT INTO `pub_news` VALUES ('27', null, '新闻新闻哦', '00', '00\\201802\\3e3d0739-b775-4372-ba28-a3cfcbd69839.html', '00_pic\\201802\\19c9b02d-eb4a-495b-9393-467c0fea546d.jpg', null, '2', '奉化', '3', null, '2018-02-13 16:22:39', 'N', null, null, null, '2018-02-23 09:23:20');
INSERT INTO `pub_news` VALUES ('28', null, 'ggg', '02', '02\\201802\\33061936-4ae3-4579-a516-eb45c979e6ba.html', '', '2018-02-22 01:17:42', '2', 'hhh', '8', null, '2018-02-22 01:16:49', 'N', null, null, null, '2018-02-22 01:17:42');
INSERT INTO `pub_news` VALUES ('29', null, 'ggg', '02', '02\\201802\\33061936-4ae3-4579-a516-eb45c979e6ba.html', '', null, '0', 'hhh', '8', null, '2018-02-22 01:16:49', 'N', null, null, null, null);
INSERT INTO `pub_news` VALUES ('30', null, '测', '00', '00\\201802\\f0ffb24a-201e-48da-9858-bd45116d2255.html', '00_pic\\201802\\0230a718-10ee-40b6-b6c7-a7f917ad050c.jpg', '2018-02-27 11:51:08', '2', '测试单位', '9', null, '2018-02-23 09:36:49', 'N', null, null, null, '2018-02-27 11:51:08');
INSERT INTO `pub_news` VALUES ('31', null, '测', '00', '00\\201802\\f0ffb24a-201e-48da-9858-bd45116d2255.html', '00_pic\\201802\\0230a718-10ee-40b6-b6c7-a7f917ad050c.jpg', null, '2', '测试单位', '9', null, '2018-02-23 09:36:49', 'N', null, null, null, null);
INSERT INTO `pub_news` VALUES ('32', null, '阿斯顿', '01', null, null, null, '0', null, null, null, '2018-02-26 12:11:25', 'N', null, null, null, null);
INSERT INTO `pub_news` VALUES ('33', null, '哈哈哈', '03', '03\\201802\\fdc37477-7adc-40c6-bc5b-f7ae215a4deb.html', '', null, '0', '江北', '5', null, '2018-02-13 17:05:17', 'N', null, null, null, null);
INSERT INTO `pub_news` VALUES ('34', null, 'ceshi', '01', '01\\201802\\6c12d2b4-158a-4612-9512-615f541c18f9.html', '', null, '0', 'fff', '7', null, '2018-02-21 22:03:02', 'N', null, null, null, '2018-02-26 12:38:24');
INSERT INTO `pub_news` VALUES ('35', null, '测试报送', '01', '01\\201803\\4118f113-cef3-471e-85bf-11dae6f43cfe.html', '', null, '2', '2', '10', null, '2018-02-26 16:20:59', 'N', null, null, null, '2018-03-12 15:37:47');
INSERT INTO `pub_news` VALUES ('36', null, '哈哈哈', '00', '00\\201802\\a81bd5cc-dca0-4fef-a329-ab61ecb87f27.html', '00_pic\\201802\\fd1750f8-6732-4802-8aa2-8b9bf7b917d1.png', null, '2', '6', '11', null, '2018-02-26 17:12:10', 'N', null, null, null, null);
INSERT INTO `pub_news` VALUES ('37', null, '中国论文数超过美国，施一公:“垃圾”太多', '00', '00\\201803\\fb30cf1f-4fe7-49a0-ac2f-150a65306049.html', '00_pic\\201803\\f208c8d0-6cf4-4699-8b11-4f2f8eaacb12.webp.jpg', '2018-03-09 09:19:10', '2', null, null, null, '2018-03-08 11:05:23', 'N', null, null, null, '2018-03-12 17:05:50');
INSERT INTO `pub_news` VALUES ('38', null, '测试ie8', '01', '01\\201803\\ffde7108-178c-46a2-a846-e204735dc7ce.html', '01_pic\\201803\\5952a0c2-40a8-451e-a6ab-8f4e6c4b5723.png', null, '2', '2', '12', null, '2018-03-12 15:55:06', 'N', null, null, null, null);

-- ----------------------------
-- Table structure for `pub_org`
-- ----------------------------
DROP TABLE IF EXISTS `pub_org`;
CREATE TABLE `pub_org` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `parent_id` int(20) DEFAULT NULL,
  `sort` int(20) DEFAULT NULL,
  `type` int(1) DEFAULT NULL COMMENT '类型0市局1其他',
  `name` varchar(200) DEFAULT NULL COMMENT '机构名称',
  `address` varchar(300) DEFAULT NULL COMMENT '地址',
  `link_man` varchar(20) DEFAULT NULL COMMENT '联系人',
  `link_phone` varchar(100) DEFAULT NULL COMMENT '联系电话',
  `create_user` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `deleted` char(1) DEFAULT 'N',
  `deleted_user` varchar(20) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `update_user` varchar(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pub_org
-- ----------------------------
INSERT INTO `pub_org` VALUES ('1', null, '1', '0', '市局', '中兴路', '大豪', '110', null, '2018-02-12 17:19:06', 'N', null, null, null, '2018-02-26 17:02:58');
INSERT INTO `pub_org` VALUES ('2', null, '1', '1', '慈溪', '慈溪', '慈溪', '110', null, '2018-02-13 09:23:28', 'N', null, null, null, '2018-02-26 17:03:09');
INSERT INTO `pub_org` VALUES ('3', null, '2', '0', '鄞州', '鄞州', '鄞州', '110', null, '2018-02-13 09:23:47', 'N', null, null, null, '2018-02-26 17:03:04');
INSERT INTO `pub_org` VALUES ('4', null, '3', '0', '海曙', '海曙', '110', '110', null, '2018-02-26 17:03:31', 'N', null, null, null, null);

-- ----------------------------
-- Table structure for `pub_test`
-- ----------------------------
DROP TABLE IF EXISTS `pub_test`;
CREATE TABLE `pub_test` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pub_test
-- ----------------------------
INSERT INTO `pub_test` VALUES ('1', 'bb');

-- ----------------------------
-- Table structure for `pub_user`
-- ----------------------------
DROP TABLE IF EXISTS `pub_user`;
CREATE TABLE `pub_user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) NOT NULL COMMENT '账号',
  `passwd` varchar(50) DEFAULT NULL COMMENT '密码',
  `name` varchar(200) DEFAULT NULL COMMENT '账户名',
  `create_user` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `deleted` char(1) DEFAULT 'N',
  `deleted_user` varchar(20) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `update_user` varchar(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pub_account_unique` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pub_user
-- ----------------------------
INSERT INTO `pub_user` VALUES ('1', 'admin', 'admin', '系统管理员', null, null, 'N', null, null, null, null);

-- ----------------------------
-- Table structure for `pub_work`
-- ----------------------------
DROP TABLE IF EXISTS `pub_work`;
CREATE TABLE `pub_work` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL COMMENT '标题',
  `main_percent` decimal(4,2) DEFAULT NULL,
  `create_user` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `deleted` char(1) DEFAULT 'N',
  `deleted_user` varchar(20) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `update_user` varchar(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pub_work
-- ----------------------------
INSERT INTO `pub_work` VALUES ('5', '124124', '12.50', null, '2018-02-10 09:54:53', 'N', null, null, null, null);
INSERT INTO `pub_work` VALUES ('6', '阿萨德噶', '13.50', null, '2018-02-10 10:09:02', 'N', null, null, null, null);
INSERT INTO `pub_work` VALUES ('7', '阿萨德噶1', '13.50', null, '2018-02-10 10:24:08', 'N', null, null, null, null);
INSERT INTO `pub_work` VALUES ('8', '阿萨德噶1', '13.50', null, '2018-02-10 10:25:03', 'N', null, null, null, null);
INSERT INTO `pub_work` VALUES ('9', '阿萨德噶1', '46.00', null, '2018-02-10 10:25:46', 'N', null, null, null, '2018-02-10 15:10:55');
INSERT INTO `pub_work` VALUES ('10', '阿萨德噶1阿萨德噶1阿萨德噶1阿萨德噶1阿萨德噶1阿萨德噶1', '66.67', null, '2018-02-10 10:27:02', 'N', null, null, null, '2018-02-26 21:33:53');

-- ----------------------------
-- Table structure for `pub_work_items`
-- ----------------------------
DROP TABLE IF EXISTS `pub_work_items`;
CREATE TABLE `pub_work_items` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `main_id` int(20) NOT NULL,
  `item_title` varchar(200) DEFAULT NULL COMMENT '标题',
  `item_percent` decimal(12,2) DEFAULT NULL COMMENT '工作完成率',
  `create_user` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `deleted` char(1) DEFAULT 'N',
  `deleted_user` varchar(20) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `update_user` varchar(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `mgr_comp` varchar(200) DEFAULT NULL,
  `link_man` varchar(200) DEFAULT NULL,
  `mgr_group` varchar(200) DEFAULT NULL,
  `group_man` varchar(200) DEFAULT NULL,
  `dateline` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pub_work_items
-- ----------------------------
INSERT INTO `pub_work_items` VALUES ('7', '5', '242', '12.00', null, '2018-02-10 09:54:54', 'N', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('8', '5', '24', '13.00', null, '2018-02-10 09:54:54', 'N', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('9', '6', '测试2', '12.00', null, '2018-02-10 10:09:02', 'N', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('10', '6', '测试3', '15.00', null, '2018-02-10 10:09:02', 'N', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('11', '7', '测试2', '12.00', null, '2018-02-10 10:24:08', 'N', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('12', '7', '测试3', '15.00', null, '2018-02-10 10:24:08', 'N', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('13', '8', '测试2', '12.00', null, '2018-02-10 10:25:04', 'N', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('14', '8', '测试3', '15.00', null, '2018-02-10 10:25:04', 'N', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('15', '9', '测试2', '12.00', null, '2018-02-10 10:26:15', 'N', null, null, null, '2018-02-10 15:10:55', null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('16', '9', '测试3', '80.00', null, '2018-02-10 10:26:15', 'N', null, null, null, '2018-02-10 15:10:55', null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('17', '10', '测试1', '80.00', null, '2018-02-10 10:27:03', 'N', null, null, null, '2018-02-26 21:33:53', '小马单位', '小马', '小组', '小王', '2018-08-07');
INSERT INTO `pub_work_items` VALUES ('18', '10', '测试3', '60.00', null, '2018-02-10 10:28:02', 'N', null, null, null, '2018-02-26 21:33:53', null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('19', '10', '测试3', '60.00', null, '2018-02-10 10:29:15', 'Y', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('20', '10', '测试4', '60.00', null, '2018-02-10 13:53:47', 'N', null, null, null, '2018-02-26 21:33:53', null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('21', '10', '测试2', '15.00', null, '2018-02-10 14:02:08', 'Y', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('22', '10', '测试2', '80.00', null, '2018-02-10 14:02:29', 'Y', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('23', '10', '测试2', '80.00', null, '2018-02-10 14:02:42', 'N', null, null, null, '2018-02-26 21:33:54', null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('24', '10', '测试5', '80.00', null, '2018-02-10 14:04:04', 'Y', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('25', '10', '测试5', '80.00', null, '2018-02-10 14:04:08', 'N', null, null, null, '2018-02-26 21:33:54', null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('26', '10', '测试6', '81.00', null, '2018-02-10 14:25:06', 'Y', null, null, null, null, null, null, null, null, null);
INSERT INTO `pub_work_items` VALUES ('27', '10', '测试6', '40.00', null, '2018-02-26 21:33:54', 'N', null, null, null, null, '责任单位', '联系人', '小组', '小王', '201877');
