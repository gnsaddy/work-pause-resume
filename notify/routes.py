import pymysql
from flask import jsonify, request
from app import apps
from config import mysql
from flask_cors import CORS, cross_origin

cors = CORS(apps)
apps.config['CORS_HEADERS'] = 'application/json'


@apps.route('/ambassador', methods=['GET'])
def ambassador():
    global cursor
    global conn
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM ambassador")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@apps.route('/ticket', methods=['GET'])
def ticket():
    global cursor
    global conn
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("select * from generated_ticket")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@apps.route('/ticket/<int:tid>', methods=['GET', 'POST'])
def ticket_id(tid):
    global cursor
    global conn
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(
            "select * from ambassador a inner join generated_ticket gt on"
            " a.amb_id = gt.amb_id_fk inner join customer c on gt.cust_id_fk = c.cust_id where gt.gtid=%s",
            tid)
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@apps.route('/customer', methods=['GET'])
def customer():
    global cursor
    global conn
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("select * from customer")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


# TODO: Add customer fetch API with ID

@apps.route('/service/<int:sid>', methods=['GET', 'POST'])
def service(sid):
    global cursor
    global conn
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(
            "select * from use_service us inner join npi_details nd on "
            "us.npi_id_fk = nd.npi_id inner join customer c on "
            "us.cust_id_fk = c.cust_id inner join ambassador a on us.amb_id_fk = a.amb_id "
            "where us.cust_id_fk=%s", sid)
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@apps.route('/service/npi/<int:npid>', methods=['GET', 'POST'])
def service_npi(npid):
    global cursor
    global conn
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("select * from npi_details nd inner join npi_member nm on "
                       "nd.npi_id = nm.npi_id_fk where nd.npi_id=%s", npid)
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@apps.route('/reason', methods=['GET'])
def reason():
    global cursor
    global conn
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM pause_reason")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@apps.route('/pause/', methods=['POST', 'GET'])
def pause():
    global cursor
    global conn
    try:
        _json = request.json
        _reason = _json['pau_reason']
        _ticket_id_fk = _json['ticket_id_fk']
        _state = _json['pause_state']

        # validate the received values
        if _json and _reason and _ticket_id_fk and request.method == 'POST':

            # save edits
            sql = "INSERT INTO pause_ticket(pau_reason, ticket_id_fk, pause_state) VALUES(%s, %s, %s)"
            data = (_reason, _ticket_id_fk, _state)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('Ticket paused!!!')
            resp.status_code = 200
            return resp
        else:
            return "Not found 404"
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@apps.route('/slots', methods=['GET'])
def slots():
    global cursor
    global conn
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("select * from slot")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()
