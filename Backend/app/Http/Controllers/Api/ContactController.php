<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Helpers\ApiMessage;
use App\Models\Contact;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        try {
            // $contact = Contact::all();
            $sortBy = $request->sort_by ?? 'full_name';
            $sortOrder = $request->sort_order ?? 'asc';
            $search = $request->search;

            $contact = Contact::when($search, function ($query) use ($search) {
                $query->where('full_name', 'like', '%' . $search . '%');
            })->orderBy($sortBy, $sortOrder)->paginate(10);

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
                'email_address' => 'required|email|unique:contact,email_address',
                'phone_number' => 'required|string',
            ];

            $message = [
                'full_name.required' => 'Full name is required',
                'email_address.required' => 'Email is required',
                'email_address.email' => 'Email must be a valid email address',
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
                $contact = new Contact();
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
            $contact = Contact::find($id);
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
            $contact = Contact::find($id);
            if (!$contact) {
                return ApiMessage::error("Contact not found", 404);
            }
            $rule = [
                'full_name' => 'sometimes|string',
                'email_address' => 'sometimes|email|unique:contact,email_address,' . $id,
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
            $contact = Contact::find($id);
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
