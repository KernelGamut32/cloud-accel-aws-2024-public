import pymysql.cursors


def lambda_handler(event, context):
    # Connect to the database
    connection = pymysql.connect(
        host="<IP-OR-DB-CLUSTER-URL>",
        user="<username>",
        password="<secure-password>",
        db="widgets",
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
    )

    try:
        with connection.cursor() as cursor:
            sql = "select * from Catalog"
            cursor.execute(sql)
            result = cursor.fetchall()
            return result
    finally:
        connection.close()
