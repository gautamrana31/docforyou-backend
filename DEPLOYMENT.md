# Docforyou Backend Deployment

Your APK cannot use `localhost` or `192.168.x.x` for client testing. Those addresses only work on your own computer/WiFi. Deploy the backend publicly and use that public URL in the app.

## Recommended Setup

Use:

- Render for Node.js backend hosting
- MongoDB Atlas for cloud database

## Environment Variables

Set these on the hosting platform:

```env
NODE_ENV=production
APP_BASE_URL=https://your-backend-name.onrender.com
CORS_ORIGIN=*
MONGO_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/docforyou
JWT_SECRET=replace-with-a-long-random-production-secret
```

## App Base URL

In the mobile app, use:

```text
https://your-backend-name.onrender.com/api
```

Do not use:

```text
http://localhost:5001/api
http://192.168.x.x:5001/api
```

## Quick Check

After deployment, open:

```text
https://your-backend-name.onrender.com/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "API is healthy"
}
```
