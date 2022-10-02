import inquirer, { DistinctChoice } from 'inquirer';
interface Question {
  type: string;
  name: string;
  message?: string;
  choices?: Record<string, any> | string[];
}
export default class InquirerBuilder {
  question: Question[];
  current?: Question;
  constructor() {
    this.question = [];
  }
  async prompt() {
    this.question.push(this.current);
    this.current = null;
    return await inquirer.prompt(this.question);
  }
  rawlist(name: string, message: string) {
    this.current = {
      type: 'rawlist',
      name,
      message,
      choices: [],
    };
    return this;
  }
  add(choice: DistinctChoice) {
    this.current.choices.push(choice);
    return this;
  }
}
