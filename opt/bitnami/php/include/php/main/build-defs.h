/*                                                                -*- C -*-
   +----------------------------------------------------------------------+
   | PHP Version 7                                                        |
   +----------------------------------------------------------------------+
   | Copyright (c) 1997-2018 The PHP Group                                |
   +----------------------------------------------------------------------+
   | This source file is subject to version 3.01 of the PHP license,      |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | http://www.php.net/license/3_01.txt                                  |
   | If you did not receive a copy of the PHP license and are unable to   |
   | obtain it through the world-wide-web, please send a note to          |
   | license@php.net so we can mail you a copy immediately.               |
   +----------------------------------------------------------------------+
   | Author: Stig Sæther Bakken <ssb@php.net>                             |
   +----------------------------------------------------------------------+
*/

/* $Id$ */

#define CONFIGURE_COMMAND " '/bitnami/blacksmith-sandox/php-7.1.17/configure'  '--prefix=/opt/bitnami/php' '--with-imap=shared,/bitnami/blacksmith-sandox/imap-2007.0.0-f' '--with-zlib-dir' '--with-zlib' '--with-freetype-dir=/usr' '--with-libxml-dir=/usr' '--enable-soap' '--with-gd' '--disable-rpath' '--enable-inline-optimization' '--with-bz2' '--enable-sockets' '--enable-pcntl' '--enable-exif' '--enable-bcmath' '--enable-zip' '--with-pdo-mysql=mysqlnd' '--with-mysqli=mysqlnd' '--with-jpeg-dir=/usr' '--with-png-dir=/usr' '--with-openssl' '--with-libdir=/lib/x86_64-linux-gnu' '--enable-ftp' '--enable-calendar' '--with-gettext' '--with-xmlrpc' '--with-xsl' '--enable-fpm' '--with-fpm-user=daemon' '--with-fpm-group=daemon' '--enable-mbstring=all' '--enable-cgi' '--enable-ctype' '--enable-session' '--enable-mysqlnd' '--enable-intl' '--with-iconv' '--with-pdo_sqlite' '--with-sqlite3' '--with-readline' '--with-gmp' '--with-curl' '--with-mysql=mysqlnd' '--with-icu-dir=/usr' '--with-pdo-pgsql=shared' '--with-pgsql=shared' '--with-config-file-scan-dir=/opt/bitnami/php/etc/conf.d' '--with-pdo-dblib=shared' '--with-mcrypt' '--with-tidy' '--with-ldap=/usr/'"
#define PHP_ADA_INCLUDE		""
#define PHP_ADA_LFLAGS		""
#define PHP_ADA_LIBS		""
#define PHP_APACHE_INCLUDE	""
#define PHP_APACHE_TARGET	""
#define PHP_FHTTPD_INCLUDE      ""
#define PHP_FHTTPD_LIB          ""
#define PHP_FHTTPD_TARGET       ""
#define PHP_CFLAGS		"$(CFLAGS_CLEAN) -prefer-non-pic -static"
#define PHP_DBASE_LIB		""
#define PHP_BUILD_DEBUG		""
#define PHP_GDBM_INCLUDE	""
#define PHP_IBASE_INCLUDE	""
#define PHP_IBASE_LFLAGS	""
#define PHP_IBASE_LIBS		""
#define PHP_IFX_INCLUDE		""
#define PHP_IFX_LFLAGS		""
#define PHP_IFX_LIBS		""
#define PHP_INSTALL_IT		""
#define PHP_IODBC_INCLUDE	""
#define PHP_IODBC_LFLAGS	""
#define PHP_IODBC_LIBS		""
#define PHP_MSQL_INCLUDE	""
#define PHP_MSQL_LFLAGS		""
#define PHP_MSQL_LIBS		""
#define PHP_MYSQL_INCLUDE	"@MYSQL_INCLUDE@"
#define PHP_MYSQL_LIBS		"@MYSQL_LIBS@"
#define PHP_MYSQL_TYPE		"@MYSQL_MODULE_TYPE@"
#define PHP_ODBC_INCLUDE	""
#define PHP_ODBC_LFLAGS		""
#define PHP_ODBC_LIBS		""
#define PHP_ODBC_TYPE		""
#define PHP_OCI8_SHARED_LIBADD 	""
#define PHP_OCI8_DIR			""
#define PHP_OCI8_ORACLE_VERSION		""
#define PHP_ORACLE_SHARED_LIBADD 	"@ORACLE_SHARED_LIBADD@"
#define PHP_ORACLE_DIR				"@ORACLE_DIR@"
#define PHP_ORACLE_VERSION			"@ORACLE_VERSION@"
#define PHP_PGSQL_INCLUDE	""
#define PHP_PGSQL_LFLAGS	""
#define PHP_PGSQL_LIBS		""
#define PHP_PROG_SENDMAIL	""
#define PHP_SOLID_INCLUDE	""
#define PHP_SOLID_LIBS		""
#define PHP_EMPRESS_INCLUDE	""
#define PHP_EMPRESS_LIBS	""
#define PHP_SYBASE_INCLUDE	""
#define PHP_SYBASE_LFLAGS	""
#define PHP_SYBASE_LIBS		""
#define PHP_DBM_TYPE		""
#define PHP_DBM_LIB		""
#define PHP_LDAP_LFLAGS		""
#define PHP_LDAP_INCLUDE	""
#define PHP_LDAP_LIBS		""
#define PHP_BIRDSTEP_INCLUDE     ""
#define PHP_BIRDSTEP_LIBS        ""
#define PEAR_INSTALLDIR         "/opt/bitnami/php/lib/php"
#define PHP_INCLUDE_PATH	".:/opt/bitnami/php/lib/php"
#define PHP_EXTENSION_DIR       "/opt/bitnami/php/lib/php/extensions"
#define PHP_PREFIX              "/opt/bitnami/php"
#define PHP_BINDIR              "/opt/bitnami/php/bin"
#define PHP_SBINDIR             "/opt/bitnami/php/sbin"
#define PHP_MANDIR              "/opt/bitnami/php/php/man"
#define PHP_LIBDIR              "/opt/bitnami/php/lib/php"
#define PHP_DATADIR             "/opt/bitnami/php/share/php"
#define PHP_SYSCONFDIR          "/opt/bitnami/php/etc"
#define PHP_LOCALSTATEDIR       "/opt/bitnami/php/var"
#define PHP_CONFIG_FILE_PATH    "/opt/bitnami/php/lib"
#define PHP_CONFIG_FILE_SCAN_DIR    "/opt/bitnami/php/etc/conf.d"
#define PHP_SHLIB_SUFFIX        "so"
