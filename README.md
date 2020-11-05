# @luzhongk/animate

js平滑动画工具类

## 安装
```bash
npm i @luzhongk/animate 
```

## 引入
```js
import animatejs from '@luzhongk/animate'

// 例子
async function test() {
  const res1 = await animatejs.animate(document.documentElement, { scrollTop: 500 })
  console.log('body滚动结束', res)

  const res2 = await animatejs.animate(box, {
    height: 100,
    'margin-top': 300,
  })
}
```

## 通过cdn引入

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>@kuan/animate</title>
  <style>
    .container {
      max-width: 600px;
      margin: 0 auto;
      height: 150vh;
      overflow-y: auto;
    }

    h2 {
      text-align: center;
    }

    .content {
      border-radius: 3px;
      padding: 10px;
      min-height: 200px;
      font-size: 20px;
      text-align: center;
      height: 200vh;
    }

    .box {
      height: 300px;
      margin-top: 100px;
      background-color: #eee;
    }

    .scroll-btn {
      position: fixed;
      bottom: 100px;
      right: 100px;
    }

    .scroll-btn2 {
      position: fixed;
      bottom: 100px;
      right: 30px;
    }
  </style>
  <script src="./animatejs.1.0.0.min.js"></script>
</head>

<body>
  <div class="container">
    <h2>@kuan/animate</h2>
    <div class="content">
      <button class="animate-btn">动画</button>
      <button class="scroll-btn">滚动1</button>
      <button class="scroll-btn2">滚动2</button>
      <div class="box"></div>
    </div>
  </div>
  <script>
    const box = document.querySelector('.box')

    document.querySelector('.animate-btn').onclick = async () => {
      const res = await animatejs.animate(box, {
        height: 100,
        'margin-top': 300,
      })
      console.log('结束', res)
    }

    document.querySelector('.scroll-btn').onclick = async () => {
      const res = await animatejs.animate(document.querySelector('.container'), { scrollTop: 300 })
      console.log('滚动结束', res)
    }

    document.querySelector('.scroll-btn2').onclick = async () => {
      const res = await animatejs.animate(document.documentElement, { scrollTop: 500 })
      console.log('body滚动结束', res)
    }
  </script>
</body>

</html>
```