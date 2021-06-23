FROM python:3.8

ENV VIRTUAL_ENV=/opt/countries-api/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PYTHONUNBUFFERED=1
ENV PORT=5001

RUN pip install --upgrade pip poetry

COPY pyproject.toml poetry.lock /opt/countries-api/

WORKDIR /opt/countries-api/

RUN POETRY_VIRTUALENVS_IN_PROJECT=true \
    poetry install --no-dev

COPY server.py db.json /opt/countries-api/

RUN useradd --user-group --system appuser
USER appuser
EXPOSE ${API_PORT}

ENTRYPOINT ["python"]
CMD ["server.py"]
