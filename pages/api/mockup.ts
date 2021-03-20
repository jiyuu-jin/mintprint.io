import axios from 'axios';

export default async (req, res) => {

  const options = {
    auth: {
      username: `${process.env.PRINTFUL}`,
      password: ``,
    },
  };
  
  const { item } = req.query;

  if (req.method === 'POST') {
    console.log(req.body);
    const mockupJob: any = await axios.post(
      `https://api.printful.com/mockup-generator/create-task/${item}`,
      req.body,
      options
    );

    let mockupTaskResponse: any = {status: "pending"};

    console.log(mockupJob);
    console.log('Waiting to pool mockup task');

    setTimeout(async () => {
      mockupTaskResponse = await axios.get(
        `https://api.printful.com/mockup-generator/task?task_key=${mockupJob.data.result.task_key}`,
        options
      );

      res.status(200).json(mockupTaskResponse.data)
    }, 60000);
  }
};