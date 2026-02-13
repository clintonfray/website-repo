# --- Stage 1: Build ---
# Use a standard public node image (or your organization's 'build' image)
FROM node:24.13.0-alpine3.23 AS builder

WORKDIR /app
COPY package*.json ./
# npm exists here, so this works
RUN npm install

# Copy source code and build (if needed)
COPY app.js .
# If you have a build step (like TypeScript or React), run it here:
# RUN npm run build


# --- Stage 2: Runtime ---
# Use standard node image for testing
FROM node:24.13.0-alpine3.23

WORKDIR /app

# Copy only the necessary files from the 'builder' stage
# This copies the node_modules folder we created in Stage 1
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app ./

# Create non-root user
# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# # Change ownership of the app directory
# RUN chown -R nextjs:nodejs /app
# USER nextjs

# Expose port 8080
EXPOSE 8080

# Use the 'node' command directly, as 'npm' is likely not available
CMD ["node", "app.js"]

