#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const prompts = require('prompts');
program.version('0.0.1', '-v, --version', '查看版本');

program
    .command('create')
    .description('创建一个模板')
    .action(async () => {
        try {
            const questions = [
                {
                    type: 'select',
                    name: 'fileType',
                    message: '创建的文件类型: ',
                    initial: 0,
                    choices: [
                        { title: 'tsx', value: 'tsx' },
                        { title: 'jsx', value: 'jsx' }
                    ]
                },
                {
                    type: 'text',
                    name: 'fileName',
                    initial: 'index',
                    message: '创建的文件名称: '
                },
                {
                    type: 'text',
                    name: 'componentName',
                    initial: 'Index',
                    message: '创建文件的模板变量名: '
                },
                {
                    type: 'toggle',
                    name: 'needLess',
                    message: '是否需要 less 文件？',
                    initial: true,
                    active: 'yes',
                    inactive: 'no'
                }
            ];
            const params = await prompts(questions);
            if (Object.values(params).length <= 0) {
                console.log('创建文件失败');
                process.exit();
                return;
            }
            const FILE_PATH_MAP = {
                0: './../templates/noLess.tsx',     // 没有less
                1: './../templates/haveLess.tsx',   // 有less
                2: './../templates/noLess.jsx',     // 没有less
                3: './../templates/haveLess.jsx'    // 有less
            };

            let resultFile = '';
            if (params.fileType === 'tsx') {
                if (params.needLess === true) {
                    resultFile = fs.readFileSync(path.join(__dirname, FILE_PATH_MAP[1]), 'utf-8');
                } else {
                    resultFile = fs.readFileSync(path.join(__dirname, FILE_PATH_MAP[0]), 'utf-8');
                }
            } else {
                if (params.needLess === true) {
                    resultFile = fs.readFileSync(path.join(__dirname, FILE_PATH_MAP[3]), 'utf-8');
                } else {
                    resultFile = fs.readFileSync(path.join(__dirname, FILE_PATH_MAP[2]), 'utf-8');
                }
            }
            resultFile = resultFile.replace(/{FileName}/g, params.componentName);
            resultFile = resultFile.replace(/{LessFileName}/g, params.fileName);
            try {
                fs.writeFileSync(`${process.cwd()}\/${params.fileName}.${params.fileType}`, resultFile);
                if (params.needLess) fs.writeFileSync(`${process.cwd()}\/${params.fileName}.module.less`, '');
                console.log('文件创建成功');
                process.exit();
            } catch (e) {
                console.error(e);
                process.exit();
            }
        } catch (e) {
            console.error(e);
            process.exit();
        }
    });

program.parse(process.argv);

const options = program.opts();
if (options.version) console.log(options);
