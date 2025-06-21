# Troubleshooting

## Immediate Crashes in Production

If the application crashes immediately upon opening in a production environment (e.g., when installed from TestFlight or the App Store).

Here are some troubleshooting steps to try out.

### Assure Convex is Deployed

A common source of errors is when the Convex backend has not been deployed to production, and changes made like renaming an api endpoint etc. will cause the app to crash immediatly.

To deploy your convex backend to production, run the following command:

```bash
bun db:deploy
```
