export const getFaqList = () => {
  return [
    {
      id:'1',  
      title: 'What does the application do ?',
      details: 'It allows you to create new groups for Topgear. You can add / remove members from the group'
    },
    {
      id:'2',
      title:'What is tcwebservice user ?',
      details: 'TCWebservice is the default user added to group, to system operations. It should not be removed from the group'
    },
    {
      id: '3',  
      title:'Is there any caching of data ?',
      details: 'The groups data is cached on server and client, to conserve bandwidth. Please refresh to get the latest copy from server'
    }
  ]
}