SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaofeiniu;
CREATE DATABASE xiaofeiniu CHARSET=UTF8;
USE xiaofeiniu;

/*管理员*/
CREATE TABLE xfn_admin(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  aname VARCHAR(32) UNIQUE,
  apwd VARCHAR(64)
);
INSERT INTO xfn_admin VALUES
(NULL, 'admin', PASSWORD('123456')),
(NULL, 'boss', PASSWORD('999999'));

/*全局设置*/
CREATE TABLE xfn_settings(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  appName VARCHAR(32),
  apiUrl VARCHAR(64),
  adminUrl VARCHAR(64),
  appUrl VARCHAR(64),
  icp VARCHAR(64),
  copyright VARCHAR(128)
);
INSERT INTO xfn_settings VALUES
(NULL, '小肥牛', 'http://127.0.0.1:8090','http://127.0.0.1:8090','http://127.0.0.1:8090','京ICP备12003709号-3','Copyright © 北京达内金桥科技有限公司版权所有');

/*桌台表*/
CREATE TABLE xfn_table(
  tid INT PRIMARY KEY AUTO_INCREMENT,
  tname VARCHAR(32),
  type VARCHAR(32),
  status INT
);
INSERT INTO xfn_table VALUES
(null, '金镶玉', '2人桌', 1),
(null, '玉如意', '2人桌', 1),
(null, '齐天寿', '6人桌', 3),
(null, '福临门', '4人桌', 2),
(null, '全家福', '6人桌', 3);

/*桌台预定信息*/
CREATE TABLE xfn_reservation(
  tid INT PRIMARY KEY AUTO_INCREMENT,
  contactName VARCHAR(32),
  phone VARCHAR(16),
  contactTime BIGINT,
  dinnerTime BIGINT
)
INSERT INTO xfn_reservation VALUES
(NULL,'丁丁','13501234567',1548404810420,1548410400000),
(NULL,'当当','13501244567',1548404820420,1548410400000),
(NULL,'豆豆','13501254567',1548404830420,1548410400000),
(NULL,'丫丫','13501264567',1548404840420,1548410400000)

/*菜品类别*/
CREATE TABLE xfn_category(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  cname VARCHAR(32)
);
INSERT INTO xfn_category VALUES(NULL,'肉类'),(NULL,'丸子滑类'),(NULL,'蔬菜豆制品'),(NULL,'海鲜河鲜'),(NULL,'菌菇类')

/*菜品*/
CREATE TABLE xfn_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(32),
    imgUrl VARCHAR(128),
    price DECIMAL(6,2),
    detail VARCHAR(128),
    categoryId INT,
    FOREIGN KEY(categoryId) REFERENCES xfn_category(cid)
)
INSERT INTO xfn_dish VALUES
(100000,'草鱼片','CE7I9470.jpg',35,'选鲜活草鱼，切出鱼片冷鲜保存。锅开后再煮1分钟左右即可食用。',1),
(NULL,'脆皮肠','CE7I9017.jpg',25,'锅开后再煮3分钟左右即可食用。',1)

/*订单*/
CREATE TABLE xfn_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    startTime BIGINT,
    endTime BIGINT,
    customerCount INT,
    tableId INT,
    FOREIGN KEY(tableId) REFERENCES xfn_table(tid)
)
INSERT INTO xfn_order VALUES
(1,1548404810420,1548405810420,3,1)

/*订单详情*/
CREATE TABLE xfn_order_detail(
  oid INT PRIMARY KEY AUTO_INCREMENT,
  dishId INT,       /*菜品编号*/
  dishCount INT,    /*份数*/
  customerName VARCHAR(32),    /*顾客名称*/
  orderId INT,      /*订单编号*/
  FOREIGN KEY(dishId) REFERENCES xfn_dish(did),
  FOREIGN KEY(orderId) REFERENCES xfn_order(oid)
);
INSERT INTO xfn_order_detail VALUES
(NULL,100001,1,'丁丁',1)