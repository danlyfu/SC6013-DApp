// server.js
const express = require('express');
const connectDB = require('./config/db');
const lendingRoutes = require('./routes/lendingRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// 连接数据库
connectDB();

// 路由
app.use('/api/lending', lendingRoutes);

// 端口配置
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
