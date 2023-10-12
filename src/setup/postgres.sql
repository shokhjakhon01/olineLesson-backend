CREATE DATABASE lessons;
\c lessons

CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    cat_id serial PRIMARY KEY,
    cat_name VARCHAR(100) NOT NULL
);

CREATE TABLE sup_categories (
    sup_id serial PRIMARY key,
    sup_name VARCHAR(50) NOT NULL,
    cat_ref_id smallint references categories(cat_id) on delete cascade
);

CREATE TABLE videos (
    video_id serial PRIMARY key,
    user_id smallint references users(user_id) on delete cascade,
    title varchar(50) not null,
    date timestamp DEFAULT CURRENT_TIMESTAMP,
    sup_category_id smallint references sup_categories(sup_id) on delete cascade,
    link varchar(255) not null
);

CREATE Table comments (
    coment_id serial PRIMARY KEY,
    user_id int references users(user_id) on delete cascade,
    video_id int references videos(video_id) on delete cascade,
    comment text
);

insert into users (username, email, password) values 
('Odil', 'ashelsher0@furl.net', 'bR3*X?zHIUDR?o'),
('Sobir', 'jmacmechan1@imageshack.us', 'uJ8\egOz2F?Sbo_UL_'),
('Qodir', 'aspinas2@ucoz.ru', 'eT5!*JWv1O#'),
('Muhammad', 'gshermar3@flickr.com', 'qV6,ELEV(csaaSmGA0'),
('Shohjahon', 'mbrockie4@noaa.gov', 'qE2><9,n"=b@bpbCe@'),
('Siroj', 'cgenery5@ebay.co.uk', 'wR4#_J`S(oy3IEs8HM'),
('Nodira', 'fquidenham6@barnesandnoble.com', 'mU3&nl<>7o$YcLb'),
('Bekjon', 'rmccusker7@economist.com', 'pQ8.Dep7&>q)9<YE<e,'),
('Ali', 'rmousley8@google.pl', 'qR7|"@QEBg&6rVO!<rT'),
('Obit', 'kwalaron9@admin.ch', 'uJ8&=!7IZjrcJZ7(t'),
('Furqat', 'cwahnckea@jimdo.com', 'bR3{<elFz5Y3zRSm2'),
('Jahon', 'ablazdellb@photobucket.com', 'oO5_"vrIqOOy%I>NKp'),
('Dilxush', 'cdemageardc@hao123.com', 'dT6%0j`H2`4'),
('Utkir', 'bwildbloodd@sciencedirect.com', 'gQ4$093#`GT'),
('Bobur', 'mwhitingtone@photobucket.com', 'vV9%tU2tY)2?qj+>PlGb'),
('Namuna', 'epriestnallf@amazonaws.com', 'pF6!W!bIc#'),
('Feruza', 'cnowickj@unesco.org', 'fW7''%X9e7F<');


insert into categories (cat_name) values 
('dasturlash'),
('dizayn'),
('marketing'),
('smm'),
('montaj');

insert into sup_categories (sup_name, cat_ref_id) values
('python', 1),
('java', 1),
('nodejs', 1),
('dotnet', 1),
('go', 1),
('logo', 2),
('grafika', 2),
('muqova', 2),
('biznes', 3),
('brand', 3),
('blog', 3),
('trading', 4),
('companing', 4),
('creating', 4),
('video', 5),
('photo', 5),
('hd lux', 5),
('media', 5);

INSERT INTO videos (user_id, title, sup_category_id, link) VALUES
(3, 'Python asoslari',  1, 'https://youtu.be/bef8QLNHubw'),   
(2, 'Java inroduction',  2, 'https://youtu.be/bef8QLNHubw'),   
(14, 'Nodejsda event loop', 3,'https://youtu.be/bef8QLNHubw'),
(13, 'C# asoslari', 4, 'https://youtu.be/bef8QLNHubw'),
(7, 'Logoda rang tanlash',  6, 'https://youtu.be/bef8QLNHubw'),
(3, 'Go da rest api tuzish', 5, 'https://youtu.be/bef8QLNHubw'),
(8, 'Nodejsda execution context', 3, 'https://youtu.be/bef8QLNHubw');


insert into comments (user_id, video_id, comment) values 
(14, 4, 'C# mazzada'),
(6, 3, 'Nodejs number one ever'),
(8, 2, 'Java eng katta va ulkan dasturlash tili'),
(9, 3, 'Nimayam derdim I love nodejs'),
(13, 2, 'Java top'),
(2, 4, 'C# yaxshi til'),
(10, 1, 'Pythonni bilmiyman organish niyatim bor'),
(6, 3, 'Nodejs best of the best'),
(13, 6, 'Go dasturlash tili judaham ajoyib til'),
(11, 6, 'I really want to learn go in the future');



-- 1.montaj/photo
-- 2bria/ java/dasturlash
-- 3. cletus/blog/marketing swimfan
-- 4. annabela/song of ceylon/blog/marketing
-- 5.  Redd/tella-tale/nodejs/dasturlash


SELECT sc.sup_id, sc.sup_name  FROM categories c
LEFT JOIN sup_categories sc 
ON c.cat_id = sc.cat_ref_id 
WHERE c.cat_name = 'dizayn';

SELECT
v.title AS video_title,
c.comment,
u.username AS commenter_username
FROM
videos v
LEFT JOIN
comments c ON v.video_id = c.video_id
LEFT JOIN
users u ON c.user_id = u.user_id
WHERE
v.video_id = 7;