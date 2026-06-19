<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Helpers\ApiMessage;
use App\Models\Contacts;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    public function index()
    {
        try {
            $contact = Contacts::all();
            return ApiMessage::success("Successfully get contact data", $contact, 200);
        } catch (\Exception $th) {
            return ApiMessage::error($th->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $rule = [
                'full_name' => 'required|string',
                'email_address' => 'required|email|unique:contacts,email',
                'phone_number' => 'required|string',
            ];

            $message = [
                'full_name.required' => 'Full name is required',
                'email.required' => 'Email is required',
                'email.email' => 'Email must be a valid email address',
                'phone_number.required' => 'Phone number is required',
            ];

            $validator = Validator::make($request->all(), $rule, $message);
            if ($validator->fails()) {
                return ApiMessage::error($validator->errors(), 400);
            }
            if ($validator->fails()) {
                return ApiMessage::error(
                    $validator->errors(),
                    400
                );
            }
            DB::beginTransaction();

            try {
                $contact = new Contacts();
                $contact->full_name = $request->full_name;
                $contact->email_address = $request->email_address;
                $contact->phone_number = $request->phone_number;
                $contact->save();

                DB::commit();
                return ApiMessage::success("Success", "Registration successfully", 201);
            } catch (\Throwable $th) {
                DB::rollBack();
                return ApiMessage::error($th->getMessage(), 500);
            }
        } catch (\Exception $th) {
            return ApiMessage::error($th->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $contact = Contacts::find($id);
            if (!$contact) {
                return ApiMessage::error("Contact not found", 404);
            }
            return ApiMessage::success("Successfully get contact data", $contact, 200);
        } catch (\Exception $th) {
            return ApiMessage::error($th->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $contact = Contacts::find($id);
            if (!$contact) {
                return ApiMessage::error("Contact not found", 404);
            }
            $rule = [
                'full_name' => 'sometimes|string',
                'email_address' => 'sometimes|email|unique:contacts,email,' . $id,
                'phone_number' => 'sometimes|string',
            ];

            $validator = Validator::make($request->all(), $rule);

            if ($validator->fails()) {
                return ApiMessage::error($validator->errors(), 400);
            }
            DB::beginTransaction();

            try {
                $contact->update($request->all());
                DB::commit();
                return ApiMessage::success("Successfully update contact", $contact, 200);
            } catch (\Throwable $th) {
                DB::rollBack();
                return ApiMessage::error($th->getMessage(), 500);
            }
        } catch (\Exception $th) {
            return ApiMessage::error($th->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $contact = Contacts::find($id);
            if (!$contact) {
                return ApiMessage::error("Contact not found", 400);
            }
            DB::beginTransaction();

            try {
                $contact->delete();
                DB::commit();
                return ApiMessage::success("Successfully delete contact", null, 200);
            } catch (\Throwable $th) {
                DB::rollBack();
                return ApiMessage::error($th->getMessage(), 500);
            }
        } catch (\Throwable $th) {
            return ApiMessage::error($th->getMessage(), 500);
        }
    }
}
