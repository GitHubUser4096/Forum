
create table User(
  id int primary key auto_increment,
  username varchar(64),
  passwordHash varchar(256)
);

create table Content(
  id int primary key auto_increment,
  userId int,
  foreign key (userId) references User(id),
  dateTimePosted datetime
);

create table Block(
  id int primary key auto_increment,
  text varchar(1024) not null default '',
  blockType varchar(50) not null default 'general',
  meta varchar(200),
  contentId int,
  foreign key (contentId) references Content(id),
  constraint check_block check (blockType in ('citation', 'interpretation', 'general'))
);

create table RatingType(
  id int primary key auto_increment,
  name varchar(50),
  lowName varchar(50),
  hiName varchar(50)
);

create table Rating(
  id int primary key auto_increment,
  contentId int,
  foreign key (contentId) references Content(id),
  typeId int,
  foreign key (typeId) references RatingType(id),
  userId int,
  foreign key (userId) references User(id),
  value int not null
);

create table Post(
  id int primary key auto_increment,
  title varchar(200) not null,
  contentId int,
  foreign key (contentId) references Content(id)
);

create table Comment(
  id int primary key auto_increment,
  parentId int,
  foreign key (parentId) references Content(id),
  contentId int,
  foreign key (contentId) references Content(id)
);

create table Panel(
  id int primary key auto_increment,
  name varchar(50)
);

create table PanelGroup(
  id int primary key auto_increment,
  name varchar(50),
  panelId int,
  foreign key (panelId) references Panel(id)
);

create table PanelGroupPost(
  id int primary key auto_increment,
  panelGroupId int,
  postId int,
  foreign key (panelGroupId) references PanelGroup(id),
  foreign key (postId) references Post(id)
);
