# 宝宝健康档案小程序前端

“宝宝健康档案”小程序的前端工程，当前基于 `Taro + React + TypeScript` 搭建，已经完成首轮工程化收口，目标是以一套可持续演进的结构承接后续正式业务开发。

当前前端已经具备：

- 基于领域拆分的 `features` 目录
- 基于共享能力拆分的 `shared` 目录
- `Taroify` 统一 UI 组件方案
- `Zod` 表单校验方案
- `Zustand` 当前上下文状态管理
- 统一请求协议与请求封装

---

## 1. 当前定位

当前项目不再是“只做联调脚手架”的状态，而是一套已经可以稳定承接业务开发的前端骨架。

当前已围绕以下主链路完成前端落地：

1. 用户初始化
2. 家庭创建与查询
3. 宝宝创建与查询
4. 病历创建与查询

当前架构也已经为后续这些能力预留了扩展空间：

- 微信登录
- 正式鉴权
- 家庭成员管理
- 家庭权限边界
- 提醒中心（用药 / 儿保 / 疫苗 / 复诊）
- 症状搜索
- 历史病历复用
- 附件上传
- 更完整的设计系统与测试体系

---

## 2. 技术栈

- 小程序框架：`Taro 4`
- 视图库：`React 18`
- 语言：`TypeScript`
- 状态管理：`Zustand`
- UI 组件库：`Taroify`
- 表单校验：`Zod`
- 构建工具：`Taro + webpack5`

这套组合当前承担的职责：

- `Taro`：小程序编译与运行时适配
- `React`：页面组织与交互逻辑
- `Zustand`：承载当前用户 / 家庭 / 宝宝上下文
- `Taroify`：统一表单、列表、按钮等基础 UI
- `Zod`：统一页面表单输入校验

---

## 3. 当前目录结构

```text
medical-record-fe
├─ config/                         # Taro 环境配置
├─ src/
│  ├─ app.tsx                      # 应用入口，注入 Taroify 主题与上下文初始化
│  ├─ app.config.ts                # 小程序页面配置
│  ├─ pages/                       # 路由壳，只做 Taro 页面导出
│  │  ├─ home/
│  │  ├─ health/
│  │  ├─ reminder/
│  │  ├─ profile/
│  │  ├─ user-init/
│  │  ├─ family/
│  │  ├─ baby/
│  │  └─ medical-record/
│  ├─ features/                    # 业务域模块
│  │  ├─ app-context/
│  │  │  └─ store.ts               # 当前用户/家庭/宝宝上下文
│  │  ├─ home/
│  │  │  └─ views/
│  │  ├─ health/
│  │  │  └─ views/
│  │  ├─ reminder/
│  │  │  └─ views/
│  │  ├─ profile/
│  │  │  └─ views/
│  │  ├─ user/
│  │  │  ├─ api.ts
│  │  │  ├─ types.ts
│  │  │  └─ views/
│  │  ├─ family/
│  │  │  ├─ api.ts
│  │  │  ├─ types.ts
│  │  │  └─ views/
│  │  ├─ baby/
│  │  │  ├─ api.ts
│  │  │  ├─ types.ts
│  │  │  └─ views/
│  │  └─ medical-record/
│  │     ├─ api.ts
│  │     ├─ types.ts
│  │     └─ views/
│  ├─ shared/                      # 跨业务共享能力
│  │  ├─ api/
│  │  │  ├─ protocol.ts            # 请求协议定义
│  │  │  └─ request.ts             # 统一请求封装
│  │  ├─ config/
│  │  │  └─ app.ts                 # baseURL 与存储 key
│  │  ├─ forms/
│  │  │  └─ use-zod-form.ts        # 通用表单校验 helper
│  │  ├─ ui/
│  │  │  ├─ page-layout.tsx
│  │  │  ├─ form-section.tsx
│  │  │  └─ record-list.tsx
│  │  └─ utils/
│  │     └─ storage.ts             # 本地存储封装
│  ├─ types/
│  │  └─ env.d.ts                  # 环境类型声明
│  ├─ utils/                       # 通用工具扩展位
│  └─ assets/                      # 当前阶段产出的首页 / tab UI 设计稿
├─ babel.config.js
├─ eslint.config.js
├─ package.json
└─ tsconfig.json
```

---

## 4. 当前架构约定

### 4.1 路由层

- `src/pages/*` 只保留路由壳
- 页面真实实现统一放在 `src/features/*/views`
- 当前 `home / health / reminder / profile` 已作为产品化 tab 骨架接入
- `user-init / family / baby / medical-record` 继续保留为实际联调页面
- 这样做是为了让路由配置和业务实现分离，避免页面文件越来越重

### 4.2 业务层

- 每个业务域独立维护自己的 `api.ts` 与 `types.ts`
- 业务页面尽量只依赖本域模块和 `shared`
- 不再使用按技术维度平铺的 `services/* + types/* + store/*` 旧结构

### 4.3 共享层

- `shared/api`：统一请求协议、query 序列化、错误处理、envelope 解包
- `shared/forms`：统一表单校验模式
- `shared/ui`：统一页面布局、区块样式、列表展示等基础视图能力
- `shared/utils`：本地缓存与纯工具能力

### 4.4 状态层

- 当前全局状态统一放在 `src/features/app-context/store.ts`
- 只维护必要上下文：
  - 当前用户 ID
  - 当前家庭 ID
  - 当前宝宝 ID
  - hydration 状态

### 4.5 表单层

- 当前页面表单统一使用 `Zod + useZodForm`
- 页面负责定义 schema
- 通用提交流程和错误映射由 `shared/forms/use-zod-form.ts` 处理

### 4.6 UI 层

- 当前统一使用 `Taroify`
- `shared/ui` 只做项目级包装，不重复造组件库
- 业务页面优先组合现有共享组件，而不是各页自行拼样式

---

## 5. 当前联调接口约定

当前后端接口前缀：

```text
/api
```

当前前端默认请求地址：

- `http://127.0.0.1:3000/api`

定义位置：

- `src/shared/config/app.ts`

当前开发态身份注入方式：

- 从本地缓存读取 `userId`
- 请求头自动带上 `x-user-id`

处理位置：

- `src/shared/api/request.ts`
- `src/shared/utils/storage.ts`

这意味着：

- 当前仍然是开发态联调方案
- 还没有正式接入微信登录和 token 鉴权
- 后续切换正式鉴权时，优先改 `shared/api/request.ts`

---

## 6. 当前已接入的后端模块

已对接的业务域：

- `user`
- `family`
- `baby`
- `medical-record`

当前前端已实际使用的接口包括：

### 用户

- `POST /api/users`
- `GET /api/users`

### 家庭

- `POST /api/families`
- `GET /api/families`

### 宝宝

- `POST /api/babies`
- `GET /api/babies`
- `GET /api/babies?familyId=xxx`

### 病历

- `POST /api/medical-records`
- `GET /api/medical-records`
- `GET /api/medical-records?babyId=xxx`

当前还没有提醒相关接口：

- 暂无 `reminder` 模块
- 暂无用药提醒 / 儿保提醒 / 疫苗提醒 / 复诊提醒的后端联调接口
- 当前提醒页已进入前端页面骨架实现，但数据仍为 UI-first 占位内容

---

## 7. 当前页面说明

### `user-init`

职责：

- 初始化开发用户
- 保存当前 `userId`

页面实现位置：

- `src/features/user/views/user-init-page.tsx`

### `family`

职责：

- 创建家庭
- 查询家庭列表
- 切换当前家庭上下文

页面实现位置：

- `src/features/family/views/family-page.tsx`

### `baby`

职责：

- 基于当前家庭创建宝宝
- 查询当前家庭下宝宝列表
- 切换当前宝宝上下文

页面实现位置：

- `src/features/baby/views/baby-page.tsx`

### `medical-record`

职责：

- 基于当前宝宝创建病历
- 查询当前宝宝病历列表

页面实现位置：

- `src/features/medical-record/views/medical-record-page.tsx`

### `home`

职责：

- 作为当前产品化 tab 结构中的首页壳
- 汇总当前用户 / 家庭 / 宝宝上下文
- 提供进入家庭 / 宝宝 / 病历 / 用户初始化页面的快捷入口

页面实现位置：

- `src/features/home/views/home-page.tsx`

### `health`

职责：

- 作为当前宝宝维度的健康入口页
- 展示症状搜索方向占位
- 汇总当前宝宝病历并提供进入病历页与宝宝切换页的入口

页面实现位置：

- `src/features/health/views/health-page.tsx`

### `reminder`

职责：

- 作为提醒中心 tab 骨架
- 展示用药 / 儿保 / 疫苗 / 复诊提醒的信息架构
- 当前阶段使用前端占位数据承接提醒页 UI

页面实现位置：

- `src/features/reminder/views/reminder-page.tsx`

### `profile`

职责：

- 作为“我的”tab 骨架
- 汇总开发用户、当前家庭、当前宝宝上下文
- 提供用户初始化、家庭管理、宝宝管理、病历管理入口

页面实现位置：

- `src/features/profile/views/profile-page.tsx`

### UI 设计稿

当前在 `src/assets` 中补充了面向小程序正式产品形态的 UI 设计稿，用于后续页面重构参考：

- 首页：首页聚焦当前宝宝、症状 / 病历搜索、宝宝切换与最近记录
- 健康页：聚焦当前宝宝维度的症状检索、病历筛选与新增记录入口
- 提醒页：聚焦用药提醒、儿保提醒、疫苗提醒、复诊提醒
- 我的页：聚焦开发用户、当前家庭 / 宝宝上下文与管理入口

说明：

- 这些设计稿已经生成到 `src/assets/*`
- 它们代表下一阶段的产品化 UI 方向
- 当前代码已经接入 `home / health / reminder / profile` 四个 tab 骨架
- 其中提醒页已经有前端页面实现，但尚未接入后端数据
- 当前真正联调的核心业务页仍然是 `user-init / family / baby / medical-record`

---

## 8. 本地启动

### 8.1 安装依赖

```powershell
cd D:\Workspace\medical-record-fe
npm install
```

### 8.2 启动小程序开发构建

```powershell
npm run dev:weapp
```

### 8.3 微信开发者工具

导入目录：

```text
D:\Workspace\medical-record-fe
```

建议：

- 编译模式选择小程序
- 本地联调时关闭域名 / TLS / HTTPS 证书校验
- 如果热更新没有生效，可手动重新编译

---

## 9. 常用命令

```powershell
npm run dev:weapp
npm run build:weapp
npm run lint
npm run typecheck
```

说明：

- `lint`：当前执行根配置文件 ESLint + TypeScript 类型检查
- `typecheck`：只执行 TypeScript 类型检查

---

## 10. 当前已完成的工程化能力

当前已经完成：

- 按领域组织的 `features` 结构
- 按共享能力组织的 `shared` 结构
- `pages` 路由壳与业务实现分离
- 统一请求封装
- 统一 query 参数序列化
- 开发态 `x-user-id` 注入
- 统一 `Taroify` 主题入口
- 统一 `Zod` 表单提交模式
- 当前业务上下文状态收口
- 一套面向正式产品化形态的小程序 UI 设计稿（首页 / 健康 / 提醒 / 我的）
- 四个产品化 tab 页面骨架（首页 / 健康 / 提醒 / 我的）

当前还没有完成：

- 微信登录
- token 鉴权
- 家庭成员与角色权限
- 提醒模块的数据模型、接口与页面实现
- 附件上传
- 搜索与病历复用
- 测试体系
- CI / 提交门禁

---

## 11. 当前限制

当前项目仍然存在这些阶段性限制：

- 默认联调地址仍写在前端环境配置中
- 当前只覆盖了最小 CRUD 联调链路
- 页面样式已统一，但还不是完整设计系统
- 表单方案已统一，但还没抽出更细粒度字段组件
- 当前 tab 页大多还是产品化骨架，对应的后端联调仍集中在 CRUD 页面
- 提醒页当前使用前端占位数据，尚未接入后端提醒模型
- 没有接入自动化测试
- 没有接入正式鉴权

这些都属于当前阶段的正常范围，目标是先保证：

1. 架构稳定
2. 联调顺畅
3. 业务可以继续往里加

---

## 12. 下一步建议

如果继续往更成熟的工程化方向推进，建议优先做：

1. 给 `shared/ui` 增加统一出口层，例如 `index.ts`
2. 给 `shared/forms` 补更多表单能力，如字段级 helper
3. 增加测试体系
4. 增加提交前校验与 CI
5. 增加 `reminder` 业务域，并补齐提醒数据结构、接口与页面
6. 逐步把 `home / health / reminder / profile` 从骨架页演进为正式业务页
7. 配合后端切正式鉴权与统一响应结构

---

## 13. 结论

当前这份 README 对应的是项目现在的真实状态：

- 不是最初的联调脚手架版本
- 已经完成首轮架构收口
- 可以继续承接正式业务开发

后续如果继续新增模块，建议遵循两个原则：

1. 新业务优先进入 `features/*`
2. 共享能力优先进入 `shared/*`
