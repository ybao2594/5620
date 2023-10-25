import * as React from 'react';

export default function Rescue() {

    //使用axios await.get从后端接受标题和内容


    //像阅读新闻文章一样有标题和内容。要能从后端接收数据
    const rescue = {
      title: '标题',
      content: '内容'
    };



  return (
    <div className="row">
      <div className='col-md-6'>
        <h1>Energy Education page</h1>
        {/* 能显示后端传来的数据，像阅读文章一样有大字标题和内容展示后端传来的数据*/}
        <h3>{rescue.title}</h3>
        <p>{rescue.content}</p>
      </div>
      <div className='col-md-3'>
      </div>
    </div>
  );
}