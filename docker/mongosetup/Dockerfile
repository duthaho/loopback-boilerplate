FROM mongo:4.2

RUN mkdir /mongosetup

WORKDIR /mongosetup
ADD . /mongosetup

CMD bash -C '/mongosetup/setup.sh';'bash'
