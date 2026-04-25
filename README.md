Game-Based Learning Platform 最小版
主攻：React + TypeScript + Tailwind + FastAPI + REST API + session + RBAC + question schema + testing + CI


模块	最小需要
项目基础	Vite + React + TypeScript
React 必学	component、props、useState、useEffect、条件渲染、列表渲染、表单、事件
TS 必学	type、interface、可选字段、对象/数组类型、函数参数类型、props 类型
API 必学	fetch、GET/POST、JSON、loading/error、response 更新 state
页面	Tutor Home、Student Join、Tutor Session、Student Session
组件	Button、Input、Card、QuestionList
数据类型	Question、Session、Submission、API request/response
样式	Tailwind 基础 layout/spacing/button/input/card
现在不用学	装饰器、Redux、Next.js、复杂 hooks、花哨优化


需要完成的内容如下：
我在简历中描述了这些完成的部分， 因此我们要做个最小的实现， 让我理解我简历描述的这些功能，并且在后期面试中可以很好的，回答我简历描述的内容。
⚫ Full-Stack System Development: Designed and implemented end-to-end tutor/student workflows using React, TypeScript, 
TailwindCSS, RESTful APIs, completing multiple production-like deployments and supporting weekly client demos with stable 
bidirectional data flows. 
⚫ System Access Control: Architected role-based session management and API route separation (public vs private question payloads), 
eliminating answer leakage issues and reducing UAT defects by ~85% in live multi-user sessions. 
⚫ Distributed Session Management: Built PIN-based real-time game sessions with synchronized state propagation across Tutor and 
Student clients, supporting concurrent joins, submissions, and progress tracking without state conflicts. 
⚫ Data Pipeline & API Contract Reliability: Standardized a JSON-based question bank schema with automated import/export and AI 
grading criteria, cutting test-data preparation time by ~50% and enabling repeatable AI API validation across releases. 
⚫ Testing, Quality & Delivery Infrastructure: Established a layered test automation framework (unit, integration, fuzz, stress) and 
integrated it into CI workflows, achieving 82%+ unit pass rate, earlier regression detection, and 20–30% faster PR validation during 
rapid iteration.

Week 1：Game-Based Learning Platform 最小版
本周目标
做出一个最小可运行系统，包含：
•	Tutor / Student 两个角色 
•	Tutor 创建 game session 
•	Student 输入 PIN 加入 
•	Tutor 能看到题目 + 标准答案 
•	Student 只能看到题目 
•	Student 提交答案 
•	Tutor 查看提交结果 
•	JSON 导入题库 
•	基础测试 
•	GitHub Actions 跑测试 
这周对应你简历里的这些点：
tutor/student workflows、role-based session management、public vs private payload、PIN-based sessions、JSON question bank schema、layered tests、CI workflows。

Day 1：搭环境 + 前端基本功
学什么
•	JavaScript 基础： 
o	变量、对象、数组、map/filter 
o	async/await 
o	fetch 
•	TypeScript 基础： 
o	type / interface 
o	optional field 
o	array/object typing 
•	React 基础： 
o	component 
o	props 
o	useState 
o	useEffect 
•	Tailwind 基础： 
o	layout 
o	spacing 
o	button/input/card 
做什么
•	建前端项目 
•	做 2 个静态页面： 
o	Tutor Home 
o	Student Join 
•	做基础组件： 
o	Button 
o	Input 
o	Card 
•	用假数据渲染 question list 
当天产出
•	能跑起来的 React + TS + Tailwind 项目 
•	一个基本页面框架 
当天必须能回答
•	props 和 state 区别 
•	useState 干嘛 
•	useEffect 什么时候用 
•	TypeScript 为什么比 JavaScript 更适合项目 


Day 2：后端入门，用 FastAPI
学什么
•	FastAPI 基础 
o	GET / POST 
o	path param / query param 
o	request body 
o	response model 
•	REST API 基础 
•	status code：200 / 201 / 400 / 404 / 422 / 500 
做什么
建立这几个 API：
•	POST /sessions 
•	POST /sessions/join 
•	GET /sessions/{pin}/question 
•	POST /sessions/{pin}/submit 
•	GET /sessions/{pin}/results 
先别接数据库，先用内存数据结构。
当天产出
•	最小 FastAPI 后端 
•	Swagger 文档可用 
•	API 能本地调通 
当天必须能回答
•	为什么用 FastAPI 不用 Flask 
•	REST API 是什么 
•	request body 怎么校验 
•	422 常见是什么问题 


Day 3：前后端第一次联调
学什么
•	fetch / axios 调 API 
•	loading / error state 
•	前后端接口契约 
•	CORS 基础 
做什么
前端做：
•	Tutor 创建 session 
•	Student 输入 PIN 加入 session 
•	根据角色显示不同页面 
当天产出
•	Tutor 可以创建 PIN 
•	Student 可以用 PIN 加入 
•	前后端联调跑通 
当天必须能回答
•	前端怎么调用后端 
•	为什么联调会出现 CORS 
•	API contract 是什么 
•	前端报错时先看什么 


Day 4：RBAC + public/private payload
学什么
•	RBAC 基础 
•	前端权限控制 vs 后端权限控制 
•	为什么答案泄露问题不能只靠前端隐藏 
做什么
实现：
•	Tutor 获取 question 时返回： 
o	question text 
o	options 
o	correct answer 
•	Student 获取 question 时返回： 
o	question text 
o	options 
o	不返回答案 
•	route separation 或者 payload filtering 二选一 
当天产出
•	真正的角色差异逻辑 
•	一个简单 auth/session role 机制 
当天必须能回答
•	什么是 public payload / private payload 
•	answer leakage 是怎么发生的 
•	为什么后端必须参与权限控制 
•	route separation 和 field filtering 的区别 


Day 5：PIN session + state propagation
学什么
•	session state 
•	React 状态提升 
•	shared state 概念 
•	“同步”到底是什么意思，别乱吹实时 
做什么
实现：
•	session 创建后保存当前题目 
•	student submit 后 tutor 能看到结果 
•	允许多个 student join 
•	做一个简单 progress state 
不用 websocket。
你现在别装实时系统，用轮询或刷新都行。重点是你得讲得清。
当天产出
•	多角色 session 流程跑通 
•	basic progress tracking 
当天必须能回答
•	state propagation 是什么意思 
•	session 里要保存哪些状态 
•	多个 student 提交会有什么冲突 
•	如果不用 websocket，你怎么做“近似同步” 


Day 6：JSON question bank + import/export
学什么
•	JSON schema 思维 
•	数据校验 
•	import/export 的基本流程 
•	为什么 schema 能提高 API reliability 
做什么
定义 question JSON 格式：
{
  "title": "Quiz 1",
  "questions": [
    {
      "id": 1,
      "text": "What is 2+2?",
      "options": ["3", "4", "5"],
      "answer": "4"
    }
  ]
}
实现：
•	上传 JSON 题库 
•	后端校验格式 
•	导出题库 
当天产出
•	一个稳定的 question bank schema 
•	import/export 流程 
当天必须能回答
•	schema validation 为什么重要 
•	不做 schema 校验会出什么问题 
•	import/export 带来什么价值 
•	API contract reliability 是什么意思 



Day 7：测试 + CI + 第一周面试复盘
学什么
•	unit test / integration test 
•	GitHub Actions 最小配置 
•	regression 基础 
做什么
至少写这些测试：
•	session 创建 
•	PIN join 失败 / 成功 
•	student 拿不到答案 
•	submit answer 成功 
•	question import 格式错误 
•	一个端到端 basic integration test 
GitHub Actions 跑：
•	install 
•	test 
•	build 
当天产出
•	5 到 8 个测试 
•	一个最小 CI 流程 
当天必须能回答
•	unit vs integration 
•	CI 做了什么 
•	为什么测试分层 
•	如果 build fail，你怎么排查 


Week 1 周末必须整理出的面试材料
30 秒版本
这个项目是什么，你做了什么，结果是什么
90 秒版本
•	背景 
•	技术栈 
•	你负责的模块 
•	关键难点 
•	解决方式 
关键追问题库
•	为什么 student 看不到 answer 
•	session 状态怎么管理 
•	PIN 为什么比直接 open URL 好 
•	JSON schema 为什么能减少问题 
•	你测了什么 
•	82%+ unit pass rate 这种数字你会怎么解释

