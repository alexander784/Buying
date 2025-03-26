# Use official Python image
FROM python:3.10.12

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt


# Collect static files
RUN python manage.py collectstatic --noinput

# Run migrations
RUN python manage.py migrate

# Expose port 8000
EXPOSE 8000

# Start Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "yourproject.wsgi:application"]
