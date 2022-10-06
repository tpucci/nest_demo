import { defineConfig } from 'vitest/config';
import { VitePluginNode, RequestAdapterParams } from 'vite-plugin-node';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

let httpAdapter: FastifyAdapter;

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: async ({
        app,
        req,
        res,
      }: RequestAdapterParams<NestFastifyApplication>) => {
        if (!httpAdapter) {
          await app.init();

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          httpAdapter = app.getHttpAdapter();

          await httpAdapter.getInstance().ready();
        }

        httpAdapter.getInstance().routing(req, res);
      },
      appPath: './src/main.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'swc',
    }),
  ],
  optimizeDeps: {
    // Vite does not work well with optionnal dependencies,
    // mark them as ignored for now
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'class-transformer',
      'class-validator',
      'fastify-swagger',
    ],
  },
  test: {
    globals: true,
  },
});
