from locust import HttpUser, task


class StressUser(HttpUser):
    @task
    def access_front(self):
        self.client.get("/")
        self.client.get("/present")
        self.client.get("/groups")
