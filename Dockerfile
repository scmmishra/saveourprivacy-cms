# Setup the build container.
FROM node:14-alpine AS build

WORKDIR /app

COPY . .

# run yarn
RUN yarn

# Build the application.
RUN yarn build

# set production env
ENV NODE_ENV production

# Expose the service's port.
EXPOSE 3000

# Run the service.
CMD ["yarn", "run", "serve"]