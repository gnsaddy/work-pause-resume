from app import apps
from flaskext.mysql import MySQL


mysql = MySQL()
# MySQL configurations
apps.config['MYSQL_DATABASE_USER'] = 'root'
apps.config['MYSQL_DATABASE_PASSWORD'] = 'system12345'
apps.config['MYSQL_DATABASE_DB'] = 'notify'
apps.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(apps)
