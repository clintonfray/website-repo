# Test Website Deployment

This folder contains Docker and Kubernetes configuration for a simple test website.

## Files

- `Dockerfile`: Creates a Debian-based container with Apache web server
- `deployment.yaml`: Kubernetes deployment and service configuration

## Usage

### Build Docker image
```bash
cd k8s-test-site
docker build -t test-website:latest .
```

### Deploy to Kubernetes
```bash
kubectl apply -f deployment.yaml
```

### Check deployment
```bash
kubectl get pods -l app=test-website
kubectl get service test-website-service
```

### Forward port to test locally
```bash
kubectl port-forward service/test-website-service 8080:80
```

Then visit http://localhost:8080 in your browser.