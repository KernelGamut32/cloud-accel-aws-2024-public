import pymysql.cursors

def lambda_handler(event, context):
# Connect to the database
  connection = pymysql.connect(host='<IP-OR-DB-CLUSTER-URL>',
                               user='<username>',
                               password='<secure-password>',
                               db='widgets',
                               charset='utf8mb4',
                               cursorclass=pymysql.cursors.DictCursor)
  
  try:
      with connection.cursor() as cursor:
          # Read a single record
          sql = "select * from Catalog"
          cursor.execute(sql)
          result = cursor.fetchall()
          print(result)
  finally:
      connection.close()
