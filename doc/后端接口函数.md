
# 后端接口与需要完成的功能

## 注册和登录页面

``` zyq ```

### 注册 √

#### 接口 

sign_up

#### 请求类型

POST

#### 功能

提供基本信息，进行注册

#### 输入

json格式的一个字典，userName,password,phone,email,userType不可为空

```json
{
    "userId":"",//注册时传输数据为空，自动注册id，实际不可为空
    "userName":"Aa1",//数字或大小写英文字母，不可为空
    "password":"Ab1234",//数字或大小写英文字母，至少6位，不可为空
    "pet":"",//可空
    "email":"12345678@qq.com",//需要检验格式，不可为空
    "userType":"individual",//个人用户或专家或管理员(individual or expert or administrator)，不可为空
}
```

#### 后续工作

检查数据格式和完整性，并检查用户名、（手机号和邮箱）是否重复，存储进user表，检测userType，如果发现是expert，存储进expert表，如果发现是administrator，报错或存储进administrator表（注意，因为理论上来说，前端不可以选择administrator，所以这里可以选择直接报错）

注意事项：1.如何创建一个administrator用户？：后端创建，注意创建的同时除了基本信息还需要管理员权限。2.理论上来说，数据库中并没有规定手机号和邮箱不能重复，由于我也不知道你们怎么想的，所以这里暂且按照现实逻辑加上了手机号和邮箱，写的时候可以考虑只写检查用户名。

#### 输出

返回一个json,内有reason的一个值，如果success则代表成功，否则返回失败原因

具体格式如下：

```json
{
    "reason":"success"
}//success

{
    "reason":"No transfer email"
}//fail
```

### 登录 √

#### 接口

sign_in

#### 请求类型

Post

#### 功能

输入用户名/手机号/邮箱和密码，返回是否正确

#### 输入

Json格式的一个字典，password不可为空，userName不可为空，可能是用户名/手机号/邮箱，需要检验

```json
{
    "userName":"Aa1",//数字或大小写英文字母
    "password":"Ab1234",//数字或大小写英文字母，至少6位
}
```

#### 后续工作

首先检验是否为空，空则false，userName格式可能是邮箱还是手机号还是用户名，之后在表中查询（不检测直接查可能会耗费大量时间），若没有查到则false，否则检测密码是否一致，若一致返回userID。

#### 输出

Json格式的一个字典，失败则只返回reason，内含原因。否则返回reason值为success和user的所有属性

```json
{
    "reason": "success",
    "password": "222",
    "userType": "individual",
    "userName": "mimi",
    "userId": 3790,
    "pet": "cat",
    "email": "234@qq.com"
}//success

{
    "reason": "password error"
}//fail
```

### 忘记密码（可选项） ×

```最后没做这个功能```

由于前端没有说要不要，所以按照常理我设置了这么一个可选项^-^，如果不做这个功能就去掉

#### 接口

forget_password

#### 请求类型

POST

#### 功能

输入邮箱，发送验证码

#### 输入

Json格式的一个字典，不可为空

```json
{
    "email":"12345678@qq,com",
}
```

#### 后续工作

检查数据格式和完整性，存储进pet表

#### 输出

Json格式的一个字典，返回true or false

```json
{
    "forget_password_success":"true"//true or false
}
```

### 根据用户名返回用户ID √

#### 接口

get_userId_by_userName

#### 请求类型

POST

#### 功能

输入用户名返回用户ID

#### 输入

Json格式的一个字典，不可为空

```json
{
    "userName":"cococo"
}
```

#### 后续工作

在数据库user表中查找到userName对应行，返回userID

#### 输出

Json格式的一个字典，返回userID,reason(success/reason)

```json
{
    "userId":"123456",
    "reason":"success"
}
{
    "reason":"fail"
}
```

## 宠物页面

``` sjq ```

### 注册宠物信息

#### 接口

registered_pet_information

#### 请求类型

POST

#### 功能

输入宠物基本信息，进行宠物信息注册

#### 输入

Json格式的一个字典，name不可为空

```json
{
    "petName":"coco",
    "tag":"cat",//cat or dog
    "age":"11",
    "gender":"male",
    "creationTimestamp":"20230919120000"//2023年9月19号12点00分00秒
}
```

#### 后续工作

检查是否为空和格式，分配id，存储进pet表

#### 输出

返回一个json字典，内有registered_pet_success的一个值，后端检验格式均正确，并成功存储进pet表，则返回"true"，否则返回false。同时有registered_pet_false_reason，如果registered_pet_success为true则为空，如果格式错误则返回"incorrect_format",如果其他错误则返回"error"。同时有registered_pet_false_type,返回失败的属性值。petID正确才返回否则为空

具体格式如下：

```json
{
    "registered_pet_success":"true",
    "registered_pet_false_reason":"",
    "registered_pet_false_type":"",
    "petID":"123456"
}//success

{
    "registered_pet_success":"false",
    "registered_pet_false_reason":"error",
    "registered_pet_false_type":"error",
    "petID":""
}//fail
```

### 根据宠物名字返回宠物ID

#### 接口

get_petID_by_petName

#### 请求类型

POST

#### 功能

输入宠物名和用户ID返回宠物ID

#### 输入

Json格式的一个字典，不可为空

```json
{
    "userID":"123245",
    "petName":"coco"
}
```

#### 后续工作

在数据库pet表中找到userID对应行，检查petName是否一致，若一致则返回petID，否则寻找下一个

#### 输出

Json格式的一个字典，返回petID

```json
{
    "petID":"123456"
}
```

### 记录宠物活动

#### 接口

record_pet_activity

#### 请求类型

POST

#### 功能

输入宠物活动信息，进行注册

#### 输入

Json格式的一个字典，petID不可为空

```json
{
    "petID":"123456",//前端获取
    "tag":"cat",//cat or dog
    "activityName":"go to school",
    "activityDescription":" cool! my dog go to school!",
    "activityTime":"20230101120000",//可以只到天？
    "activityLocation":"school",
    "creationTimestamp":"20230101120000"
}
```

#### 后续工作

检查格式并存储进数据库，分配ID

#### 输出

返回一个json字典，内有record_pet_activity_success的一个值，后端检验格式均正确，不重复，并成功存储，则返回"true"，否则返回false。同时有record_pet_activity_false_reason，如果record_pet_activity_success为true则为空，如果重复则返回"repeat",如果格式错误则返回"incorrect_format",如果其他错误则返回"error"。同时有record_pet_activity_false_type,返回sign in失败的属性值。activityID，只有成功才能返回，否则为空

具体格式如下：

```json
{
    "record_pet_activity_success":"true",
    "record_pet_activity_false_reason":"",
    "record_pet_activity_false_type":"",
    "activityID":"123456"
}//success

{
    "record_pet_activity_success":"false",
    "record_pet_activity_false_reason":"repeat",
    "record_pet_activity_false_type":"activityName",
    "activityID":""
}//fail
```

### 记录宠物饮食习惯

#### 接口

record_pet_eatinghabit

#### 请求类型

POST

#### 功能

输入宠物饮食习惯，进行注册

#### 输入

Json格式的一个字典，petID不可为空

```json
{
    "petID":"123456",//前端获取
    "tag":"cat",//cat or dog
    "eatingName":"eat fish",
    "eatingDescription":" cool! my cat eat a fish!",
    "eatingTime":"20230101120000",//可以只到天？
    "creationTimestamp":"20230101120000"
}
```

#### 后续工作

检查格式并存储进数据库，分配ID

#### 输出

返回一个json字典，内有record_pet_eatinghabit_success的一个值，后端检验格式均正确，不重复，并成功存储，则返回"true"，否则返回false。同时有record_pet_eatinghabit_false_reason，如果record_pet_eatinghabit_success为true则为空，如果重复则返回"repeat",如果格式错误则返回"incorrect_format",如果其他错误则返回"error"。同时有record_pet_eatinghabit_false_type,返回sign in失败的属性值。eatinghabitID，只有成功才能返回，否则为空

具体格式如下：

```json
{
    "record_pet_eatinghabit_success":"true",
    "record_pet_eatinghabit_false_reason":"",
    "record_pet_eatinghabit_false_type":"",
    "eatinghabitID":"123456"
}//success

{
    "record_pet_eatinghabit_success":"false",
    "record_pet_eatinghabit_false_reason":"repeat",
    "record_pet_eatinghabit_false_type":"activityName",
    "eatinghabitID":""
}//fail
```

## AI宠物助手界面

``` sjq ```

### AI宠物助手

#### 接口

AI_pet

#### 请求类型

POST

#### 功能

输入问题，链接api，进行解答

#### 输入

Json格式的一个字典，question

```json
{
    "question":"where is my dog?"
}
```

#### 后续工作

链接api，丢给AI回答，获取答案并返回

#### 输出

Json格式的一个字典，anwser

```json
{
    "anwser":"in your heart"
}
```

## 发帖界面

```  ```

### 发布帖子

#### 接口

publish_post

#### 请求类型

POST

#### 功能

发布帖子

#### 输入

```json
{
    "userID":"123456",
    "postTitle":"I have a cat",
    "postContent":"wow!so cool!!!!!",
    "postImage":"",//可为空
}
```

#### 后续工作

检查格式并存储进数据库并分配ID

#### 输出

返回一个json字典，内有publish_post_success的一个值，后端检验格式均正确，不重复，并成功存储，则返回"true"，否则返回false。同时有publish_post_false_reason，如果publish_post_success为true则为空，如果重复则返回"repeat",如果格式错误则返回"incorrect_format",如果其他错误则返回"error"。同时有publish_post_false_type,返回sign in失败的属性值。postID，只有成功才能返回，否则为空

具体格式如下：

```json
{
    "publish_post_success":"true",
    "publish_post_false_reason":"",
    "publish_post_false_type":"",
    "postID":"123456"
}//success

{
    "publish_post_success":"false",
    "publish_post_false_reason":"repeat",
    "publish_post_false_type":"postTitle",
    "postID":""
}//fail
```

### 根据帖子标题返回帖子ID

#### 接口

get_postID_by_postTitle

#### 请求类型

POST

#### 功能

输入帖子标题和用户ID返回帖子ID

#### 输入

Json格式的一个字典，不可为空

```json
{
    "userID":"123245",
    "postTitle":"coco"
}
```

#### 后续工作

在数据库post表中找到userID对应行，检查postTitle是否一致，若一致则返回postID，否则寻找下一个

#### 输出

Json格式的一个字典，返回postID

```json
{
    "postID":"123456"
}
```

### 回复帖子

#### 接口

reply_post

#### 请求类型

POST

#### 功能

回复帖子

#### 输入

```json
{
    "userID":"123456",
    "postID":"213456",
    "replyContent":"wow!so cool!!!!!",
    "replyImage":"",//可为空
}
```

#### 后续工作

检查格式并存储进数据库并分配ID

#### 输出

返回一个json字典，内有reply_post_success的一个值，后端检验格式均正确，不重复，并成功存储，则返回"true"，否则返回false。同时有reply_post_false_reason，如果reply_post_success为true则为空，如果重复则返回"repeat",如果格式错误则返回"incorrect_format",如果其他错误则返回"error"。同时有reply_post_false_type,返回sign in失败的属性值。replyID，只有成功才能返回，否则为空

具体格式如下：

```json
{
    "reply_post_success":"true",
    "reply_post_false_reason":"",
    "reply_post_false_type":"",
    "replyID":"123456"
}//success

{
    "reply_post_success":"false",
    "reply_post_false_reason":"repeat",
    "reply_post_false_type":"postTitle",
    "replyID":""
}//fail
```

### 根据回复内容返回回复ID

#### 接口

get_replyID_by_replyContent

#### 请求类型

POST

#### 功能

输入帖子ID和用户ID和回复内返回回复ID

#### 输入

Json格式的一个字典，不可为空

```json
{
    "userID":"123245",
    "postID":"213456",
    "replyContent":"wow!so cool!!!!!"
}
```

#### 后续工作

在数据库reply表中找到postID对应行，检查userID和replyContent是否一致，若一致则返回replyID，否则寻找下一个

#### 输出

Json格式的一个字典，返回replyID

```json
{
    "replyID":"123456"
}
```

## 宠物产品页面

``` sjq ```

### 发布宠物产品

#### 接口

create_product

#### 请求类型

POST

#### 功能

发布宠物产品

#### 输入

```json
{
    "userID":"123456",
    "productName":"cat cat cat",
    "pet":"cat",
    "productInformation":"wow!!!",
}
```

#### 后续工作

检查格式并存储进数据库并分配ID

#### 输出

返回一个json字典

具体格式如下：

```json
{
    "reason":"success",
    "productID":"123456",
    "userID":"123456",
    "productName":"cat cat cat",
    "pet":"cat",
    "productInformation":"wow!!!",
}//success

{
    "create_product_success":"productName repeat",
}//fail
```

### 评论宠物产品

#### 接口

review_product

#### 请求类型

POST

#### 功能

评论宠物产品

#### 输入

```json
{
    "userID":"123456",
    "productID":"213456",
    "reviewContent":"cool",
    "rating":"1.0",
}
```

#### 后续工作

检查格式并存储进数据库并分配ID

#### 输出

返回一个json字典，

具体格式如下：

```json
{
    "reason":"success",
    "reviewID":"123456",
    "userID":"123456",
    "productID":"213456",
    "reviewContent":"cool",
    "rating":"1.0",
}//success

{
    "reason":"postTitle repeat",
}//fail
```

## 专家页面

``` zyq ```

### 专家信息展示

#### 接口

display_expert_information

#### 请求类型

POST

#### 功能

展示专家详情页面，由于我不知道你们前端打算怎么展示，所以这里只写了通过id获取一种，如果要通过名字等信息获取，请和我提需求

#### 输入

```json
{
    "expertID":"123456"
}
```

#### 后续工作

在expert表中查找到对应ID

#### 输出

```json
{
    "userName":"kaka",
    "email":"12345678@qq.com",
    "expertProfile":"cool",
    "expertRating":"1.1"
}
```

### 专家评价

#### 接口

consultate_expert

#### 请求类型

POST

#### 功能

输入用户对专家的评价

#### 输入

```json
{
    "userID":"123452",
    "expertID":"123456",
    "consultationContent":"aaaaa",
    "replyContent":"yyyyy",
    "consultationRating":"1.1",
    "consultationTimestamp":"20230304110000"
}
```

#### 后续工作

存储进ExpertConsultation，创建ID，并且计算评分，在expert表中更新

#### 输出

返回一个json字典，内有consultate_expert_success的一个值，后端检验格式均正确，不重复，并成功存储，则返回"true"，否则返回false。同时有consultate_expert_reason，如果consultate_expert_success为true则为空，如果重复则返回"repeat",如果格式错误则返回"incorrect_format",如果其他错误则返回"error"。同时有consultate_expert_false_type,返回sign in失败的属性值。consultationID，只有成功才能返回，否则为空

具体格式如下：

```json
{
    "consultate_expert_success":"true",
    "consultate_expert_false_reason":"",
    "consultate_expert_false_type":"",
    "consultationID":"123456"
}//success

{
    "consultate_expert_success":"false",
    "consultate_expert_false_reason":"incorrect_format",
    "consultate_expert_false_type":"replyContent",
    "consultationID":""
}//fail
```

## 领养页面

``` yj ```

### 领养宠物

#### 接口

create_adopt_pet

#### 请求类型

POST

#### 功能

创建一个宠物领养信息

#### 输入

```json
{
    "creatorID":"12345",
    "adoptorID":"123456",//可为空
    "petName":"cc",
    "tag":"cat",
    "age":"1",
    "gender":"male",
    "adoptionStatus":"yes",
    "creationTimestamp":"20230506110000",
}
```

#### 后续工作

存储进数据库，创建ID

#### 输出

返回一个json字典，内有create_adopt_pet_success的一个值，后端检验格式均正确，不重复，并成功存储，则返回"true"，否则返回false。同时有create_adopt_pet_reason，如果create_adopt_pet_success为true则为空，如果重复则返回"repeat",如果格式错误则返回"incorrect_format",如果其他错误则返回"error"。同时有create_adopt_pet_false_type,返回sign in失败的属性值。adoptionPetID，只有成功才能返回，否则为空

具体格式如下：

```json
{
    "create_adopt_pet_success":"true",
    "create_adopt_pet_false_reason":"",
    "create_adopt_pet_false_type":"",
    "adoptionPetID":"123456"
}//success

{
    "create_adopt_pet_success":"false",
    "create_adopt_pet_false_reason":"incorrect_format",
    "create_adopt_pet_false_type":"petName",
    "adoptionPetID":""
}//fail
```

## 事件信息页面

``` yj ```

### 事件信息

#### 接口

create_event

#### 请求类型

POST

#### 功能

创建一个事件

#### 输入

```json
{
    "creatorID":"123452",
    "eventName":"go",
    "eventDescription":"avavavava",
    "eventTime":"20230102130000",
    "eventLocation":"school",
    "creationTimestamp":"20230203120000"
}
```

#### 后续工作

存储进数据库，创建ID

#### 输出

返回一个json字典，内有create_event_success的一个值，后端检验格式均正确，不重复，并成功存储，则返回"true"，否则返回false。同时有create_event_reason，如果create_event_success为true则为空，如果重复则返回"repeat",如果格式错误则返回"incorrect_format",如果其他错误则返回"error"。同时有create_event_false_type,返回sign in失败的属性值。eventIID，只有成功才能返回，否则为空

具体格式如下：

```json
{
    "create_event_success":"true",
    "create_event_false_reason":"",
    "create_event_false_type":"",
    "eventIID":"123456"
}//success

{
    "create_event_success":"false",
    "create_event_false_reason":"incorrect_format",
    "create_event_false_type":"replyContent",
    "eventIID":""
}//fail
```

## 救助页面

``` yj ```

### 创建救助信息

#### 接口

create_rescue

#### 请求类型

POST

#### 功能

创建一个救助页面

#### 输入

```json
{
    "creatorID":"123452",
    "rescueName":"gio",
    "rescueDescription":"aaaa",
    "date":"20230102190000",//可以到天
    "location":"school",
    "image":"",//可以为空
    "creationTimestamp":"20230406180000",
}
```

#### 后续工作

存储进数据库，创建ID

#### 输出

返回一个json字典，内有create_rescue_success的一个值，后端检验格式均正确，不重复，并成功存储，则返回"true"，否则返回false。同时有create_rescue_reason，如果create_rescue_success为true则为空，如果重复则返回"repeat",如果格式错误则返回"incorrect_format",如果其他错误则返回"error"。同时有create_rescue_false_type,返回sign in失败的属性值。rescueIID，只有成功才能返回，否则为空

具体格式如下：

```json
{
    "create_rescue_success":"true",
    "create_rescue_false_reason":"",
    "create_rescue_false_type":"",
    "rescueIID":"123456"
}//success

{
    "create_rescue_success":"false",
    "create_rescue_false_reason":"incorrect_format",
    "create_rescue_false_type":"replyContent",
    "rescueIID":""
}//fail
```
