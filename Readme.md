# Deployment steps:
Develop source code on hexo-dev branch.

When ready, merge hexo to hexo-dev.
```
git checkout hexo-dev
git merge hexo

git add .
git commit -m "Merge hexo to hexo-dev for checking"
git push
```

Resolve all conflicts(if any), then merge hexo-dev to hexo
```
git checkout hexo
git merge hexo-dev

git add .
git commit -m "Checked no conflicts. Merge hexo-dev to hexo."
git push
```

Merge hexo to master
```
git checkout master
git merge hexo

git add .
git commit -m "Get the static page ready. Merge hexo to master."
git push
```

Deploy
```
git checkout master
hexo clean && hexo deploy
```


# Git ignore should include
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
Readme.md
theme
