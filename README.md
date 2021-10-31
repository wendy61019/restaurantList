# 天天美食網

一個以 Node.js 與 Express.js 打造的餐廳美食網站，提供使用者註冊個人帳號，可管理自己的餐廳清單，如新增、修改、刪除餐廳資料等功能。同時，使用者也可以依照餐廳名稱與類別進行搜尋。

# 專案畫面
![restaurant CRUD function](https://user-images.githubusercontent.com/92006997/139583836-86a4d650-0c77-4d1c-b847-e5a2f20ef824.png)

![showpage CRUD function](https://user-images.githubusercontent.com/92006997/139583860-8860e3c6-c7a2-4a6d-9f7d-c4041e5f3413.png)

# Features - 產品功能

- [x] 使用者可以在首頁瀏覽所有餐廳。
- [x] 使用者可以檢視餐廳詳細資訊，包含類別、地址、電話、評分、圖片及 Google Map。
- [x] 使用者可以依照中文名稱、英文名稱與餐廳類別進行搜尋。
- [x] 使用者可以新增一家餐廳。
- [x] 使用者可以修改一家餐廳的資訊。
- [x] 使用者可以刪除一家餐廳。

# Installing - 專案安裝流程

1. 打開你的終端機 (Terminal)，複製 (Clone) 此專案至本機電腦

```

git clone https://github.com/wendy61019/restaurantList.git

```

2. 開啟 Terminal，進入存放此專案的資料夾

```

cd restaurantList

```

3. 安裝 npm 套件

```

在 Terminal 輸入 npm install 指令

```

4. 安裝 nodemon 套件

```

在 Terminal 輸入 nodemon app.js 指令

```

5. 匯入種子檔案

```

在 Terminal 找到 restaurantSeeder.js 檔案

執行 node models/seeder/restaurantSeeder.js 匯入使用者與餐廳資料

```

當 Terminal 出現以下字樣，即表示種子資料已新增至資料庫，按下 ctrl + c 結束執行

```

restaurantSeeder done!

mongodb connected!

```

6. 啟動伺服器，執行 app.js 檔案

```

nodemon app.js

```

7. 當 Terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```

Express is listening on localhost:3000

mongodb connected!

```

8. 若欲暫停請按 ctrl + c

# Environment SetUp - 環境建置
[Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境

[Express](https://www.npmjs.com/package/express) - 應用程式架構

[Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎

[Bootstrap](https://getbootstrap.com/)

[Font-awesome](https://fontawesome.com/)

# Contributor - 開發人員

[Wendy Wu](https://github.com/wendy61019)
