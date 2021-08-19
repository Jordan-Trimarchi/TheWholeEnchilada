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

COPY product FROM '/seed/product.csv' DELIMITER ',' CSV HEADER;

create table features (
  id INTEGER PRIMARY KEY, 
  product_id integer, 
  feature text, 
  value text, 
  foreign key (product_id) references product(id)
);
COPY features FROM '/seed/features.csv' DELIMITER ',' CSV HEADER;

create table styles (
  id INTEGER PRIMARY KEY, 
  product_id integer, 
  name text, 
  sale_price text null, 
  original_price text, 
  default_style text, 
  foreign key(product_id) references product(id)
);
COPY styles FROM '/seed/styles.csv' DELIMITER ',' CSV HEADER;

create table photos (
  id INTEGER PRIMARY KEY, 
  style_id integer, 
  url text, 
  thumbnail_url text, 
  foreign key(style_id) references styles(id)
); 
COPY photos FROM '/seed/photos.csv' DELIMITER ',' CSV HEADER;

create table skus (
  sku INTEGER PRIMARY KEY, 
  style_id integer, 
  size text, 
  quantity integer, 
  foreign key(style_id) references styles(id)
);
COPY skus FROM '/seed/skus.csv' DELIMITER ',' CSV HEADER;

create table related (
  id INTEGER PRIMARY KEY, 
  current_product_id integer, 
  related_product_id integer
);
COPY related FROM '/seed/related.csv' DELIMITER ',' CSV HEADER;

-- --  product w/ features array
-- select *, (select json_agg(features) from (select feature, value from features where product_id = product.id) features) as features from product where id = $1;

-- --style with photos and skus
-- select *, 
-- (select json_agg(photos) from (select url, thumbnail_url from photos where style_id = styles.id) photos) as photos,
-- (select jsonb_object_agg(sku, skus) from (select sku, quantity, size from skus where style_id = styles.id) skus) as skus
-- from styles where product_id = $1;

-- --products 
-- select * from product order by id limit $1 offset $2;

-- --related
-- (select json_agg(related.related_product_id) as related from (select related_product_id from related where current_product_id = $1) related);


--indexing

--styles
  create index idx_style_id on styles(id);

  create index idx_photos_styleId on photos(style_id);

  create index idx_sku_styleId on skus(style_id);

  create index idx_style_prodId on styles(product_id);

--features
  
  create index idx_feature_prodId on features(product_id);
  
  create index idx_product_Id on product(id);

--related

  create index idx_related_prodCurrId on related(current_product_id);
