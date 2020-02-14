export const getFaqList = () => {
  return [
    {
      id:'1',  
      title: 'What is the tool all about ?',
      details: 'This tool helps you to create new groups for Topgear members. You can add a new group, edit a group, add members to a group and remove members from a group' +
      'It will serve as a temporary stop gap arrangement, until group management is a first class feature in the platform.'
    },
    {
      id:'2',
      title:'How to create a Group ?',
      details: 'You can create a group using the New Group button from the right top corner on the ' + 
      'Homepage of the tool. You will be asked for Group Name and Description, after filling the' +
      'required information, click on Save to create a new group.' 
    },
    {
      id: '3',  
      title:'How to search for a Group ?',
      details: 'You can search for a group using the search functionality in the top bar on the Homepage of the tool.'
    },
    {
      id: '4',  
      title:'How to add members to a Group ?',
      details: 'In the group page, click on the Add Members tab. In the Enter Members field put in the' +
      ' handles/emails separated by comma(,), colon(:), semicolons(;) or newlines. It’s recommended ' +
      ' to add a max of 10-15 users at a time.'
    },
    {
      id: '5',  
      title:'Can I create more than one group at a time ?',
      details: 'You can’t create multiple groups at a time. But you can create groups one after one.'
    },
    {
      id: '6',  
      title:'What is a Child Group? Can I add Child Groups?',
      details: 'A Child Group is a subset of the group and maybe termed as a subgroup. You need to ask ' +
       'Topcoder Support to create a Child Group.'
    },
    {
      id: '7',  
      title:'Who has access to this tool ?',
      details: 'Access is restricted to few Topgear admins who create and manage groups for accounts.' +
      'It will not be distributed to wider audience. Access will be granted by support team.'
    },
    {
      id: '8',  
      title:'I see tcwebservice and ask.topgear user auto added to the group ?',
      details: 'These are default users added to group by the system. These should not be removed.'
    },
    {
      id: '9',  
      title:'I do not see my group Id after creation ?',
      details: 'Data is heavily cached in the application to conserve bandwidth. Please use the refresh icon to refresh the list from server.'
    },
    {
      id: '10',  
      title:'I do not see all members of a group ?',
      details: 'By default 20 members of the group are loaded. Searching is done on loaded members only. Please use the LoadMore to load next set of 20 members'
    },
    {
      id: '11',  
      title:'I have some queries and issues, whom should I contact?',
      details: 'Please write to us at support@topcoder.com or you can directly log issues on our Github' +
       'repo from here https://github.com/topcoder-platform/group-manager-client/issues'
    }
  ]
}