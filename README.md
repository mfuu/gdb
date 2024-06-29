# gdb

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![mdx](https://img.shields.io/badge/mdx-yellow?style=for-the-badge&logo=MDX&logoColor=white)  ![giscus](https://img.shields.io/badge/giscus-%2319c37d?style=for-the-badge&logo=giscus&logoColor=white)

gdb(github discussion blog) 是一款开箱即用的博客。

系统主题：[AstroPaper](https://github.com/satnaing/astro-paper)

## 实现

#### 1.开启项目的 Discussion 功能

#### 2.编写自动同步 Discussion 脚本

脚本内容参考 `scripts/fetch-discussions.mjs`

在 packages.json 文件里新增了一个命令:
```json
"scripts": {
  "fetch": "node scripts/fetch-discussions.mjs",
}
```

#### 3.使用 GitHub Workflow 自动同步

```yml
name: Generate blog based on discussions

on:
  discussion:
    types:
      [
        created,
        edited,
        deleted,
        pinned,
        unpinned,
        labeled,
        unlabeled,
        category_changed,
      ]
 
  workflow_dispatch:


permissions:
  contents: write
  pages: write

jobs:
  fetch-discussions:
    # 只有这里配置的 Category 中的 Discussion 才会写入
    if: contains(fromJson('["blog"]'), github.event.discussion.category.slug)
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Fetch Discussions
        run: npm run fetch --repository "${{github.repository}}"

      - name: Build Blog
        run: npm run build

      - name: Deploy Github Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
```
