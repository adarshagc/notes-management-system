FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y maven

RUN mvn clean package -DskipTests

# 🔥 Fix: use explicit jar name
CMD ["sh", "-c", "java -jar target/*.jar"]