ARG NODE_VERSION=16

# Setup the build container.
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

COPY . .

# install pnpm
RUN yarn global add pnpm

# run pnpm
RUN pnpm i

# Copy the source files.
COPY src src
COPY tsconfig.json .

# Build the application.
RUN pnpm build

# set production env
ENV NODE_ENV production

# Expose the service's port.
EXPOSE 3000

# Run the service.
CMD ["npm", "run", "serve"]