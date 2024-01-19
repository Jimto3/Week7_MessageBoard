CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  category VARCHAR(255) NOT NULL
)

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id)
)

insert into posts(name, message, category_id, likes) 
values 
('Sarah Johnson', 'Hey there! Excited to be part of the community. Lets connect and share some great ideas!', '3', '0'), 
('Alex Rodriguez', 'Greetings! Looking forward to engaging in interesting conversations. Feel free to reach out anytime!', '3', '0'), 
('Emily Chang', 'Hi everyone! Thrilled to join this platform. Lets make it a fantastic experience together!', '3', '0')

insert into categories(category) 
values
 ('General Chat'), 
 ('Announcements'), 
 ('Introductions'), 
 ('Feedback and Suggestions'), 
 ('Events and Meetups'), 
 ('Technical Support'), 
 ('Collaboration Opportunities'), 
 ('Show and Tell'), 
 ('Question and Answer'), 
 ('Community Guidelines')

insert into posts (name, message, category_id, likes)
values
('Jason Thompson','Hey everyone! Just checking in to see how your day is going. Any exciting news to share?','1','0'),
('Olivia Martinez','Important update! Please take a moment to read the latest announcement about upcoming changes.','2','0'),
('Emma Reynolds','Your input matters! Share your thoughts on how we can improve and make this community even better.','4','0'),
('Lucas Turner','Need some advice on a coding challenge. Any coding ninjas here who can help me out?','9','0'),
('Aiden Brown','Friendly reminder to review and follow our community guidelines. Lets make this space awesome for everyone!','10','0')