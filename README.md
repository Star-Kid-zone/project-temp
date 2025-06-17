things needed inn the project
need php 8.3 and react 19, node 23

sudo apt install php8.3-xml php8.3-dom
sudo apt install php8.3-mysql
sudo apt install php8.3-mbstring

copy .env.example to .env

npm run dev


php artisan migrate
php artisan db:seed


php artisan migrate:fresh --seed

