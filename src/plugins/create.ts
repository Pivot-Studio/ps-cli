import inquirer from 'inquirer';
import { createProject, createComponent } from './creatures';
export default async () => {
  let { creature } = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'creature',
      message: 'Choose what you want to create.',
      choices: [
        {
          name: 'Component',
          value: 'component',
        },
        {
          name: 'Project',
          value: 'project',
        },
      ],
    },
  ]);

  if (creature == 'component') {
    let { component } = await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'component',
        message: 'Choose the component you want',
        choices: [
          {
            name: 'Vue',
            value: 'Vue',
          },
          {
            name: 'React',
            value: 'React',
          },
        ],
      },
    ]);
    let type;
    if (component == 'React') {
      type = (
        await inquirer.prompt([
          {
            type: 'rawlist',
            name: 'type',
            message: 'Choose the React component type you want',
            choices: [
              {
                name: 'Hook',
                value: 'Hook',
              },
              {
                name: 'Class',
                value: 'Class',
              },
            ],
          },
        ])
      ).type;
    }
    createComponent(component, type);
  }
  if (creature == 'project') {
    let { frame } = await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'frame',
        message: 'which frame do you want',
        choices: [
          {
            name: 'Vue',
            value: 'Vue',
          },
          {
            name: 'React',
            value: 'React',
          },
        ],
      },
    ]);
    if (frame == 'Vue') {
      let { version, projectName } = await inquirer.prompt([
        {
          type: 'rawlist',
          name: 'version',
          message: 'Choose vue version you need',
          choices: [
            {
              name: 'Vue2',
              value: 2,
            },
            {
              name: 'Vue3',
              value: 3,
            },
          ],
        },
        {
          type: 'input',
          name: 'projectName',
          message: 'Your project name',
          default: 'PS',
        },
      ]);
      if (version == 2) {
        createProject(frame, projectName);
      }
      if (version == 3) {
        console.log(3);
      }
    } else {
      let { projectName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Your project name',
          default: 'PS',
        },
      ]);
      createProject(frame, projectName);
    }
  }
};
