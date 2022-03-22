import inquirer from "inquirer"
import { createProject, createComponent } from './creatures.js'
export default async () => {
    let { creature } = await inquirer.prompt([{
        type: "rawlist",
        name: 'creature',
        message: 'Choose what you want to create.',
        choices: [{
            name: 'Component',
            value: 'component'
        },
        {
            name: 'Project',
            value: 'project'
        }
        ]
    }])

    if (creature == 'component') createComponent()
    if (creature == 'project') {
        let { version, projectName } = await inquirer.prompt([
            {
                type: "rawlist",
                name: 'version',
                message: 'Choose vue version you need',
                choices: [{
                    name: 'Vue2',
                    value: 2
                },
                {
                    name: 'Vue3',
                    value: 3
                }
                ]
            }, {
                type: 'input',
                name: 'projectName',
                message: 'Your project name',
                default: 'PS'
            }

        ])
        if (version == 2) {
            createProject(projectName)
        }
        if (version == 3) {
            console.log(3);
        }
    }
}