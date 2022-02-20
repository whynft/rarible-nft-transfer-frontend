FROM python:3.9.5-slim

WORKDIR /opt

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
     && apt-get -y install gcc libpq-dev python3-dev netcat

COPY requirements.txt /opt/.
RUN pip install --no-cache-dir --upgrade -r /opt/requirements.txt

COPY ./ /opt/

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
