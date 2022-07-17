import { NextConfig, NextApiHandler } from 'next';
export { SafeNappiApiHandler } from './real-types.js';

interface NappiPluginConfig {
    baseDir?: string;
    tsOut?: string;
}
declare function nappiPlugin(baseConfig: NextConfig, config?: NappiPluginConfig): NextConfig;

declare type InferResponse<Response> = Response extends NextApiHandler<infer Response> ? Response : never;

declare type ApiResponse<T extends string> = never;

export { ApiResponse, InferResponse, nappiPlugin };
