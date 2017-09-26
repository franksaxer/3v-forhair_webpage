# Introduction

In this directory the keys and certificates for the HTTPS encryption take place. Each environment (dev, prd, ...) gets its own directory and will be selected by the server application.<br>
Keys and certificates are not stored into the repository and are on the ignorelist therefore. When develope and test the user has to generate his own key and use a self-signed certificate. The production takes a certificate that is signed by _Let's Encrypt_ with the _certbot_. The following sections explain how to handle this. The instructions are for a debian based operating system.


## Developement (Self-Signed)

Follow the instructions to generate a key and sign the key yourself.

```
$ mkdir dev
$ openssl genrsa -out key.pem 2048
$ openssl req -new -x509 -key key.pem -out cert.pem -days 3650
```

If you should rename the key or certificate, the server application can not found them anymore. Both will be only used when run within the development environment.<br>
Longer keys than 2048 can lead to trouble. The certificate is valid for 10 years. Adjust it if necessary.<br>
On the first call, the certificate has to be trusted by the used web browser.


## Production (Let's Encrypt)

Follow the instructions to generate a key and sign it with _Let' Encrypt_. Replace the domain name with yours.

```
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
$ sudo apt-get install certbot
$ certbot certonly -d DOMAIN\_NAME
```

Select the options to store the generated files into the web root. Afterwards you can link them from there to our server.

```
$ mkdir prd
$ sudo ln -s /etc/letsencrypt/live/DOMAIN\_NAME/fullchain.pem prd/cert.pem
$ sudo ln -s /etc/letsencrypt/live/DOMAIN\_NAME/privkey.pem prd/key.pem
```

To automatically update the certificate create an _cron job_ else it would expire after 90 days.

```
$ sudo crontab -e
> 1 3,23 * * * /opt/certbot/certbot-auto renew >> /var/log/letsencrypt-renew.log
```
