const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const Message = require('./models/message');
const Conversation = require('./models/coversation');
var io = require('socket.io-client')('http://localhost:4200');

mongoose
	.connect('mongodb+srv://shahbaz:NINkG7wzO51bI3a8@cluster0-zdaq2.mongodb.net/chatt-db?retryWrites=true&w=majority')
	.then(() => {
		console.log('Connected');
	})
	.catch(() => {
		console.log('connection failed');
	});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'),
		res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});
//___________________

//just checking server
app.use('/api/pos', (req, res, next) => {
	res.end('hello');
});

// for post request
app.post('/api/user', (req, res, next) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	});
	//console.log(user);
	User.findOne({ email: req.body.email }, (err, user1) => {
		if (err) {
			//handle error here
		}

		//if a user was found, that means the user's email matches the entered email
		if (user1) {
			var err = new Error('A user with that email has already registered. Please use a different email..');
			res.status(400).json({
				message: 'user not added successfully'
			});
		} else {
			user.save().then((createdUser) => {
				res.status(200).json({
					message: 'user added successfully',
					userId: createdUser._id
				});
			});
		}
	});
});

//forgetting one user base on name
app.get('/api/userbyname', (req, res, next) => {
	//console.log(req.query.username)
	User.findOne({ username: req.query.username }).then((document) => {
		res.status(200).json({
			message: 'user fetched',
			user: document
		});
	});
});
app.get('/api/userbyname1', (req, res, next) => {
	console.log(req.query.username);
	User.findOne({ username: req.query.username, password: req.query.password }).then((document) => {
		res.status(200).json({
			message: 'data fetched',
			users: document
		});
	});
});

app.get('/api/userbyId', (req, res, next) => {
	console.log(req.query.id);
	User.findOne({ _id: req.query.id }).then((document) => {
		res.status(200).json({
			message: 'user fetched',
			user: document
		});
	});
});
//____________________

//_______________________
app.get('/api/getmessages', (req, res, next) => {
	const co = Conversation.findOne(
		{
			$or: [
				{ participants: { $elemMatch: { senderId: req.query.senderId, receiverId: req.query.receiverId } } },
				{ participants: { $elemMatch: { senderId: req.query.receiverId, receiverId: req.query.senderId } } }
			]
		},
		async (err, result) => {
			//console.log(result._id);
			if (result) {
				const mess = Message.findOne(
					{
						conversationId: result._id
					},
					(err, result) => {
						if (result) {
							res.status(200).json({
								response: 'message returned',
								message: result.message
							});
						}
						//console.log(res)
					}
				);
			}
		}
	);
	//console.log(co)
});
//forgetting one user base on id
app.use('/api/userbyid', (req, res, next) => {
	User.findOne({ _id: req.body.id }).then((document) => {
		res.status(200).json({
			message: 'user fetched',
			user: document
		});
	});
});
app.post('/api/followUser', (req, res, next) => {
	console.log(req.body);
	const followUser = async () => {
		await User.updateOne(
			{
				_id: req.body.myId,
				'followings.following': { $ne: req.body.friendId }
			},
			{
				$push: {
					followings: {
						following: req.body.friendId,
						friendName: req.body.friendName
					}
				}
			}
		);
		await User.updateOne(
			{
				_id: req.body.friendId,
				'followers.follower': { $ne: req.body.myId }
			},
			{
				$push: {
					followers: {
						follower: req.body.myId,
						friendName: req.body.myName
					}
				}
			}
		);
	};
	followUser()
		.then(
			res.status(200).json({
				message: 'data fetched'
			})
		)
		.catch(
			res.status(400).json({
				message: 'error'
			})
		);
});
//Message Related Api
app.post('/api/savemessage', (req, res, next) => {
	const co = Conversation.find(
		{
			$or: [
				{ participants: { $elemMatch: { senderId: req.body.senderId, receiverId: req.body.receiverId } } },
				{ participants: { $elemMatch: { senderId: req.body.receiverId, receiverId: req.body.senderId } } }
			]
		},
		async (err, result) => {
			if (result.length > 0) {
				Message.updateOne(
					{
						conversationId: result[0]._id
					},
					{
						$push: {
							message: {
								senderId: req.body.senderId,
								receiverId: req.body.receiverId,
								senderName: req.body.senderName,
								receiverName: req.body.receiverName,
								body: req.body.message
							}
						}
					}
				)
					.then(() => {
						User.updateOne(
							{
								_id: req.body.receiverId
							},
							{
								$push: {
									notifications: {
										senderId: req.body.senderId,
                    //receiverId:req.body.receiverId,
                    senderName:req.body.senderName,
										message: req.body.senderName + ' is send you a message',
										created: new Date(),
										viewProfile: false
									}
								}
							}
						).then(() => {
							console.log('updated');
							res.status(200).json({ message: 'messsage send successfully' });
						});
						//	res.status(200).json({ message: 'message sent' });
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				const newConversation = new Conversation();
				newConversation.participants.push({
					senderId: req.body.senderId,
					receiverId: req.body.receiverId
				});

				const saveConversation = await newConversation.save();
				const newMessage = new Message();
				(newMessage.conversationId = saveConversation._id),
					//console.log(saveConversation._id)
					(newMessage.sender = req.body.senderName),
					(newMessage.receiver = req.body.recieverName),
					newMessage.message.push({
						senderId: req.body.senderId,
						receiverId: req.body.receiverId,
						senderName: req.body.senderName,
						receiverName: req.body.receiverName,
						body: req.body.message
					});

				User.updateOne(
					{
						_id: req.body.senderId
					},
					{
						$push: {
							chattList: {
								$each: [
									{
										userId: req.body.recieverId,
										mesId: newMessage._id
									},
									{
										$position: 0
									}
								]
							}
						}
					}
				);
				User.updateOne(
					{
						_id: req.body.recieverId
					},
					{
						$push: {
							chattList: {
								$each: [
									{
										userId: req.body.senderId,
										mesId: newMessage._id
									},
									{
										$position: 0
									}
								]
							}
						}
					}
				);
				newMessage.save().then(() => {
					User.updateOne(
						{
							_id: req.body.receiverId
						},
						{
							$push: {
								notifications: {
									senderId: req.body.senderId,
									senderName:req.body.senderName,
									message: req.body.senderName+'is send you a message',
									created: new Date(),
									viewProfile: false
								}
							}
						}
					).then(() => {
						console.log('updated');
						res.status(200).json({ message: 'messsage send successfully' });
					});
					console.log('sent');
				});
			}
		}
	);
});

// For get Api
app.use('/api/users', (req, res, next) => {
	User.find().then((document) => {
		res.status(200).json({
			message: 'data fetched',
			users: document
		});
	});

	//Delete Api
	app.get('/api/getUser', (req, res, next) => {
		console.log('fds');
		User.findOne({ username: req.query.username, password: req.query.password }).then((document) => {
			res.status(200).json({
				message: 'data fetched',
				users: document
			});
		});
  });

	app.get('/api/login', (req, res, next) => {
		console.log('fds');
		User.findOne({ username: req.query.username, password: req.query.password }).then((document) => {
			res.status(200).json({
				message: 'data fetched',
				users: document
			});
		});
	});

	app.delete('/api/posts:id', (req, res, next) => {
		//console.log(req.params.id)
		Post.deleteOne({ _id: req.params.id }).then((result) => {
			//console.log(result)
			res.status(200).json({
				message: 'post deleted'
			});
		});
	});
});

module.exports = app;
