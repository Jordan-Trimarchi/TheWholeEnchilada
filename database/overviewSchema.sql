DROP DATABASE if exists product_overview;

CREATE DATABASE product_overview;

\c product_overview;


create table product (
  id INTEGER PRIMARY KEY ,
  name VARCHAR,
  slogan varchar,
  description varchar,
  category varchar,
  default_price varchar
);

COPY product FROM '/Users/jordant./Documents/SDC_data/product.csv' DELIMITER ',' CSV HEADER;

create table features (
  id INTEGER PRIMARY KEY, 
  product_id integer, 
  feature text, 
  value text, 
  foreign key (product_id) references product(id)
);
COPY features FROM '/Users/jordant./Documents/SDC_data/features.csv' DELIMITER ',' CSV HEADER;

create table styles (
  id INTEGER PRIMARY KEY, 
  product_id integer, 
  name text, 
  sale_price text null, 
  original_price text, 
  default_style text, 
  foreign key(product_id) references product(id)
);
COPY styles FROM '/Users/jordant./Documents/SDC_data/styles.csv' DELIMITER ',' CSV HEADER;

create table photos (
  id INTEGER PRIMARY KEY, 
  style_id integer, 
  url text, 
  thumbnail_url text, 
  foreign key(style_id) references styles(id)
); 
COPY photos FROM '/Users/jordant./Documents/SDC_data/photos.csv' DELIMITER ',' CSV HEADER;

create table skus (
  id INTEGER PRIMARY KEY, 
  style_id integer, 
  size text, 
  quantity integer, 
  foreign key(style_id) references styles(id)
);
COPY skus FROM '/Users/jordant./Documents/SDC_data/skus.csv' DELIMITER ',' CSV HEADER;

create table related (
  id INTEGER PRIMARY KEY, 
  current_product_id integer, 
  related_product_id integer
);
COPY related FROM '/Users/jordant./Documents/SDC_data/related.csv' DELIMITER ',' CSV HEADER;

--  product w/ features array
select *, (select json_agg(features) from (select feature, value from features where product_id = product.id) features) as features from product where id = $1;

--style with photos and skus
select *, 
(select json_agg(photos) from (select url, thumbnail_url from photos where style_id = styles.id) photos) as photos,
(select jsonb_object_agg(id, sku) from (select id, quantity, size from skus where style_id = styles.id) sku) as skus
from styles where product_id = $1;