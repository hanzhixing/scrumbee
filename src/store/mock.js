export default {
    actions: {},
    session: {},
    entities: {
        sprints: {
            '19d387ef-446c-489a-9e75-8a2cc71c6d39': {
                id: '19d387ef-446c-489a-9e75-8a2cc71c6d39',
                startDate: '2019-07-08T00:00:00.000+08:00',
                endDate: '2019-07-21T23:59:59.999+08:00',
                hoursPerDay: 8,
                hoursPerStoryPoint: 2,
                $goals: [
                    'db1d05cd-d29d-439c-b072-84796f0ba677',
                ],
            }
        },
        goals: {
            'db1d05cd-d29d-439c-b072-84796f0ba677': {
                id: 'db1d05cd-d29d-439c-b072-84796f0ba677',
                title: '完成上帝视角基本布局',
            },
        },
        stories: {
            '6901ebde-b605-492a-82cb-1f5ad43a7e7b': {
                id: '6901ebde-b605-492a-82cb-1f5ad43a7e7b',
                title: '开发这个应用首先得有mock数据，写这个有点累。',
                importance: 900,
                status: 'DONE',
                $tasks: [
                    '930da241-6f93-48d2-9826-a299419c809b',
                    '3c728de7-bf3d-41cb-89af-da5bdf59487f',
                    '7a1fb80c-337e-4013-96ae-7d7ec8d0c036',
                    '4f3f9cb7-69c7-454c-94ee-bcb48296aa3f',
                ],
            },
            '81e8af0b-ecdc-41ad-ba59-ae04d0b3957c': {
                id: '81e8af0b-ecdc-41ad-ba59-ae04d0b3957c',
                title: '团队中所有人都可以通过上帝视角查阅Sprint的全貌',
                status: 'DOING',
                $tasks: [
                    'f8a5b11b-4df3-4fa0-bc94-967fc84cafa9',
                    '9e6be069-03a8-48d6-ac5f-2131fd86c028',
                    '49e2381f-1a4e-4742-a946-955a58b22792',
                    '723f05e9-987a-4de0-b2fa-76541a0afd32',
                    'ee61ebad-8cca-44f6-9b90-98c1e1689a1f',
                    '5c3e4097-fd77-4a1b-8fc3-d633ec95fad1',
                ],
            },
            '90ec327c-cc30-49db-8551-d82d294b8fb8': {
                id: '90ec327c-cc30-49db-8551-d82d294b8fb8',
                title: '每个成员可以快速地更新自己的Story和Task',
                status: 'TODO',
                $tasks: [
                    '88e75222-9f04-4133-838c-c47b019bf104',
                    'c33a729e-6f92-40b9-bbc7-2033e177f1a0',
                ],
            },
            '42743cf8-8f9d-4525-b102-8a9a2d10be0f': {
                id: '42743cf8-8f9d-4525-b102-8a9a2d10be0f',
                title: '计划会议的时候可以专注Backlog和Story',
                status: 'TODO',
                $tasks: [],
            },
            'aa6f1555-9dad-44d9-9e45-044bba8d8569': {
                id: 'aa6f1555-9dad-44d9-9e45-044bba8d8569',
                title: 'Story要自动汇总任务的状态',
                status: 'DOING',
                $tasks: [],
            },
            'b86fa6a1-b7be-49f0-9c74-55077ccd54ed': {
                id: 'b86fa6a1-b7be-49f0-9c74-55077ccd54ed',
                title: '每个任务都要可视化方式来展示估算和实际成本',
                status: 'TODO',
                $tasks: [],
            },
        },
        tasks: {
            '930da241-6f93-48d2-9826-a299419c809b': {
                id: '930da241-6f93-48d2-9826-a299419c809b',
                $story: '6901ebde-b605-492a-82cb-1f5ad43a7e7b',
                title: '先把Story, Task, Members的mock数据写完',
                status: 'DOING',
                $member: '6ef9cf7a-6b7c-45a5-8abb-013d4c3baab4',
                estimate: 8,
                cost: 5,
                unplanned: 2,
                points: {
                    '07-08.01': {estimate: true, cost: true},
                    '07-08.02': {estimate: true, cost: true},
                    '07-08.03': {estimate: true, cost: true},
                    '07-08.04': {estimate: true, cost: true},
                    '07-09.01': {estimate: true, cost: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-10.01': {estimate: true},
                    '07-10.02': {estimate: true},
                },
            },
            '3c728de7-bf3d-41cb-89af-da5bdf59487f': {
                id: '3c728de7-bf3d-41cb-89af-da5bdf59487f',
                $story: '6901ebde-b605-492a-82cb-1f5ad43a7e7b',
                title: 'react-virtualized和react-window的选型',
                status: 'DONE',
                $member: '058184fe-7daf-41ad-b589-d44cdf150f22',
                estimate: 4,
                cost: 4,
                points: {
                    '07-09.01': {estimate: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-10.01': {estimate: true},
                    '07-10.02': {estimate: true, cost: true},
                    '07-10.03': {estimate: true, cost: true},
                    '07-10.04': {cost: true},
                    '07-11.01': {cost: true},
                    '07-11.02': {cost: true},
                },
            },
            '7a1fb80c-337e-4013-96ae-7d7ec8d0c036': {
                id: '7a1fb80c-337e-4013-96ae-7d7ec8d0c036',
                $story: '6901ebde-b605-492a-82cb-1f5ad43a7e7b',
                title: '每个成员的颜色值的mock数据',
                status: 'DONE',
                $member: '7e7b88f9-2b15-46f0-91d5-ceee0e2bde69',
                estimate: 4,
                cost: 4,
                points: {
                    '07-08.01': {estimate: true, cost: true},
                    '07-08.02': {estimate: true, cost: true},
                    '07-08.03': {estimate: true, cost: true},
                    '07-08.04': {estimate: true, cost: true},
                    '07-09.01': {estimate: true, cost: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-10.01': {estimate: true},
                    '07-10.02': {estimate: true},
                },
            },
            '4f3f9cb7-69c7-454c-94ee-bcb48296aa3f': {
                id: '4f3f9cb7-69c7-454c-94ee-bcb48296aa3f',
                $story: '6901ebde-b605-492a-82cb-1f5ad43a7e7b',
                title: '日、故事点是需要计算出来',
                status: 'TODO',
                $member: '5ad8b946-c23c-4158-a4aa-f22d64b48bf5',
                points: {
                    '07-08.01': {estimate: true, cost: true},
                    '07-08.02': {estimate: true, cost: true},
                    '07-08.03': {estimate: true, cost: true},
                    '07-08.04': {estimate: true, cost: true},
                    '07-09.01': {estimate: true, cost: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-10.01': {estimate: true},
                    '07-10.02': {estimate: true},
                },
            },
            'f8a5b11b-4df3-4fa0-bc94-967fc84cafa9': {
                id: 'f8a5b11b-4df3-4fa0-bc94-967fc84cafa9',
                $story: '81e8af0b-ecdc-41ad-ba59-ae04d0b3957c',
                title: '每日N个故事点',
                status: 'TODO',
                $member: '5ad8b946-c23c-4158-a4aa-f22d64b48bf5',
                points: {
                    '07-08.01': {estimate: true, cost: true},
                    '07-08.02': {estimate: true, cost: true},
                    '07-08.03': {estimate: true, cost: true},
                    '07-08.04': {estimate: true, cost: true},
                    '07-09.01': {estimate: true, cost: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-10.01': {estimate: true},
                    '07-10.02': {estimate: true},
                },
            },
            '9e6be069-03a8-48d6-ac5f-2131fd86c028': {
                id: '9e6be069-03a8-48d6-ac5f-2131fd86c028',
                $story: '81e8af0b-ecdc-41ad-ba59-ae04d0b3957c',
                title: '列出每个成员以及它们的颜色',
                status: 'DOING',
                $member: '5ad8b946-c23c-4158-a4aa-f22d64b48bf5',
                points: {
                    '07-08.01': {estimate: true, cost: true},
                    '07-08.02': {estimate: true, cost: true},
                    '07-08.03': {estimate: true, cost: true},
                    '07-08.04': {estimate: true, cost: true},
                    '07-09.01': {estimate: true, cost: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-10.01': {estimate: true},
                    '07-10.02': {estimate: true},
                },
            },
            '49e2381f-1a4e-4742-a946-955a58b22792': {
                id: '49e2381f-1a4e-4742-a946-955a58b22792',
                $story: '81e8af0b-ecdc-41ad-ba59-ae04d0b3957c',
                title: '虚拟窗口滚动方案需要熟悉一下各个API',
                status: 'DOING',
                $member: '5ad8b946-c23c-4158-a4aa-f22d64b48bf5',
                points: {
                    '07-08.01': {estimate: true, cost: true},
                    '07-08.02': {estimate: true, cost: true},
                    '07-08.03': {estimate: true, cost: true},
                    '07-08.04': {estimate: true, cost: true},
                    '07-09.01': {estimate: true, cost: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-10.01': {estimate: true},
                    '07-10.02': {estimate: true},
                },
            },
            '723f05e9-987a-4de0-b2fa-76541a0afd32': {
                id: '723f05e9-987a-4de0-b2fa-76541a0afd32',
                $story: '81e8af0b-ecdc-41ad-ba59-ae04d0b3957c',
                title: '每故事点为N小时',
                status: 'TODO',
                $member: '5ad8b946-c23c-4158-a4aa-f22d64b48bf5',
                points: {
                    '07-08.01': {estimate: true, cost: true},
                    '07-08.02': {estimate: true, cost: true},
                    '07-08.03': {estimate: true, cost: true},
                    '07-08.04': {estimate: true, cost: true},
                    '07-09.01': {estimate: true, cost: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-10.01': {estimate: true},
                    '07-10.02': {estimate: true},
                },
            },
            'ee61ebad-8cca-44f6-9b90-98c1e1689a1f': {
                id: 'ee61ebad-8cca-44f6-9b90-98c1e1689a1f',
                $story: '81e8af0b-ecdc-41ad-ba59-ae04d0b3957c',
                title: '每个人可以分配估算和实际的颜色',
                status: 'TODO',
                $member: '5ad8b946-c23c-4158-a4aa-f22d64b48bf5',
                points: {
                    '07-08.01': {estimate: true, cost: true},
                    '07-08.02': {estimate: true, cost: true},
                    '07-08.03': {estimate: true, cost: true},
                    '07-08.04': {estimate: true, cost: true},
                    '07-09.01': {estimate: true, cost: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-10.01': {estimate: true},
                    '07-10.02': {estimate: true},
                },
            },
            '5c3e4097-fd77-4a1b-8fc3-d633ec95fad1': {
                id: '5c3e4097-fd77-4a1b-8fc3-d633ec95fad1',
                $story: '81e8af0b-ecdc-41ad-ba59-ae04d0b3957c',
                title: '每个单元格用估算颜色填充背景色',
                status: 'TODO',
                $member: '5ad8b946-c23c-4158-a4aa-f22d64b48bf5',
                points: {
                    '07-08.01': {estimate: true, cost: true},
                    '07-08.02': {estimate: true, cost: true},
                    '07-08.03': {estimate: true, cost: true},
                    '07-08.04': {estimate: true, cost: true},
                    '07-09.01': {estimate: true, cost: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-10.01': {estimate: true},
                    '07-10.02': {estimate: true},
                },
            },
            '88e75222-9f04-4133-838c-c47b019bf104': {
                id: '88e75222-9f04-4133-838c-c47b019bf104',
                $story: '90ec327c-cc30-49db-8551-d82d294b8fb8',
                title: 'Story和Task都可以点击弹出修改表单',
                status: 'TODO',
                $member: '5ad8b946-c23c-4158-a4aa-f22d64b48bf5',
                points: {
                    '07-08.01': {estimate: true, cost: true},
                    '07-08.02': {estimate: true, cost: true},
                    '07-08.03': {estimate: true, cost: true},
                    '07-08.04': {estimate: true, cost: true},
                    '07-09.01': {estimate: true, cost: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-13.01': {estimate: true},
                    '07-14.02': {estimate: true},
                },
            },
            'c33a729e-6f92-40b9-bbc7-2033e177f1a0': {
                id: 'c33a729e-6f92-40b9-bbc7-2033e177f1a0',
                $story: '90ec327c-cc30-49db-8551-d82d294b8fb8',
                title: '用醒目的颜色现实估算和实际成本',
                status: 'TODO',
                $member: '5ad8b946-c23c-4158-a4aa-f22d64b48bf5',
                points: {
                    '07-08.01': {estimate: true, cost: true},
                    '07-08.02': {estimate: true, cost: true},
                    '07-08.03': {estimate: true, cost: true},
                    '07-08.04': {estimate: true, cost: true},
                    '07-09.01': {estimate: true, cost: true},
                    '07-09.02': {estimate: true},
                    '07-09.03': {estimate: true},
                    '07-09.04': {estimate: true},
                    '07-10.01': {estimate: true},
                    '07-10.02': {estimate: true},
                },
            }
        },
        members: {
            '6ef9cf7a-6b7c-45a5-8abb-013d4c3baab4': {
                id: '6ef9cf7a-6b7c-45a5-8abb-013d4c3baab4',
                realname: '孙悟空',
                color: 'hsl(0, 100%, 80%)',
            },
            '058184fe-7daf-41ad-b589-d44cdf150f22': {
                id: '058184fe-7daf-41ad-b589-d44cdf150f22',
                realname: '张飞',
                color: 'hsl(60, 100%, 80%)',
            },
            '7e7b88f9-2b15-46f0-91d5-ceee0e2bde69': {
                id: '7e7b88f9-2b15-46f0-91d5-ceee0e2bde69',
                realname: '猪八戒',
                color: 'hsl(150, 100%, 80%)',
            },
            '5ad8b946-c23c-4158-a4aa-f22d64b48bf5': {
                id: '5ad8b946-c23c-4158-a4aa-f22d64b48bf5',
                realname: '曹操',
                color: 'hsl(240, 100%, 90%)',
            },
            '60195ce2-c85e-41a5-9e3b-03d31024b6fb': {
                id: '60195ce2-c85e-41a5-9e3b-03d31024b6fb',
                realname: '唐僧',
                color: 'hsl(180, 100%, 90%)',
            },
            '198b41bf-0d0a-4add-968b-5ac57b1a070c': {
                id: '198b41bf-0d0a-4add-968b-5ac57b1a070c',
                realname: '刘备',
                color: 'hsl(120, 100%, 90%)',
            },
            '4e244013-d145-4a63-8b41-6133e6993464': {
                id: '4e244013-d145-4a63-8b41-6133e6993464',
                realname: '李白',
                color: 'hsl(60, 100%, 90%)',
            },
            '85c1f044-fd8b-4395-bec1-24711b10d259': {
                id: '85c1f044-fd8b-4395-bec1-24711b10d259',
                realname: '牛头人',
                color: 'hsl(0, 100%, 90%)',
            },
            'a8cc9161-c8c8-4939-93e3-8b10e36650f5': {
                id: 'a8cc9161-c8c8-4939-93e3-8b10e36650f5',
                realname: '敌法师',
                color: 'hsl(300, 100%, 90%)',
            }
        },
    },
    ui: {
        GodView: {
            headerHeight: 30,
            gridRowHeight: 24,
            gridColumnWidth: 20,
            columns: {
                stories: [
                    // {key: 'importance', align: 'right', valign: 'center', width: 60},
                    {key: 'title', align: 'left', valign: 'top', width: 200},
                    // {key: 'status', align: 'center', valign: 'center', width: 80},
                ],
                tasks: [
                    // {key: 'importance', align: 'right', width: 60},
                    {key: 'title', align: 'left', valign: 'top', width: 300},
                    {key: 'status', align: 'center', width: 80},
                    {key: '$member', align: 'center', width: 80},
                    // {key: 'estimate', align: 'right', width: 50},
                    // {key: 'cost', align: 'right', width: 50},
                    // {key: 'unplanned', align: 'right', width: 60},
                ],
            }
        },
    },
};
