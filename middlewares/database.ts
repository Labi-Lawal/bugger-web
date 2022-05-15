import { connect } from 'mongoose';
// import nextConnect from 'next-connect';

export default connect(process.env.MONGO_URI_LOCAL!)
.then(()=> console.log("***** CONNECTION TO DATABASE SUCCESSFUL *****"))
.catch((error)=> console.log('***** ERROR CONNECTING TO DATABASE ***** \n', error));


